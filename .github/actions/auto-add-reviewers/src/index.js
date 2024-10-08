import * as core from "@actions/core";
import * as github from "@actions/github";

import sampleSize from "lodash.samplesize";
import { parseYAML } from "confbox";

// ------------ utils

function chooseReviewers(owner, config) {
    const { useReviewGroups, reviewGroups, numberOfReviewers, reviewers } = config;
    let chosenReviewers = [];
    const useGroups = useReviewGroups && Object.keys(reviewGroups).length > 0;

    if (useGroups) {
        chosenReviewers = chooseUsersFromGroups(owner, reviewGroups, numberOfReviewers);
    } else {
        chosenReviewers = chooseUsers(reviewers, numberOfReviewers, owner);
    }

    return chosenReviewers;
}

function chooseAssignees(owner, config) {
    const {
        useAssigneeGroups,
        assigneeGroups,
        addAssignees,
        numberOfAssignees,
        numberOfReviewers,
        assignees,
        reviewers,
    } = config;
    let chosenAssignees = [];

    const useGroups = useAssigneeGroups && Object.keys(assigneeGroups).length > 0;

    if (typeof addAssignees === "string") {
        if (addAssignees !== "author") {
            throw new Error(
                "Error in configuration file to do with using addAssignees. Expected 'addAssignees' variable to be either boolean or 'author'",
            );
        }
        chosenAssignees = [owner];
    } else if (useGroups) {
        chosenAssignees = chooseUsersFromGroups(
            owner,
            assigneeGroups,
            numberOfAssignees || numberOfReviewers,
        );
    } else {
        const candidates = assignees ? assignees : reviewers;
        chosenAssignees = chooseUsers(candidates, numberOfAssignees || numberOfReviewers, owner);
    }

    return chosenAssignees;
}

function chooseUsers(candidates, desiredNumber, filterUser = "") {
    const filteredCandidates = candidates.filter((reviewer) => {
        return reviewer.toLowerCase() !== filterUser.toLowerCase();
    });

    // all-assign
    if (desiredNumber === 0) {
        return filteredCandidates;
    }

    return sampleSize(filteredCandidates, desiredNumber);
}

function includesSkipKeywords(title, skipKeywords) {
    for (const skipKeyword of skipKeywords) {
        if (title.toLowerCase().includes(skipKeyword.toLowerCase()) === true) {
            return true;
        }
    }

    return false;
}

function chooseUsersFromGroups(owner, groups, desiredNumber) {
    let users = [];
    for (const group in groups) {
        users = users.concat(chooseUsers(groups[group], desiredNumber, owner));
    }
    return users;
}

async function fetchConfigurationFile(client, options) {
    const { owner, repo, path, ref } = options;
    const result = await client.rest.repos.getContent({
        owner,
        repo,
        path,
        ref,
    });

    const data = result.data;

    if (!data.content) {
        throw new Error("the configuration file is not found");
    }

    const configString = Buffer.from(data.content, "base64").toString();
    const config = parseYAML(configString);

    return config;
}

//------------- pull-request

class PullRequest {
    #client;
    #context;

    constructor(client, context) {
        this.#client = client;
        this.#context = context;
    }

    async mentionInComments(reviewers) {
        const { owner, repo, number: prNumber } = this.#context.issue;
        const result = await this.#client.rest.issues.createComment({
            owner,
            repo,
            issue_number: prNumber,
            body: `👋 @${reviewers.join(", @")}, please review this PR!`,
        });
        core.debug(JSON.stringify(result));
    }

    async addReviewers(reviewers) {
        const { owner, repo, number: pull_number } = this.#context.issue;
        const result = await this.#client.rest.pulls.requestReviewers({
            owner,
            repo,
            pull_number,
            reviewers: [reviewers[0]], // only one reviewer can be added for our organization
        });
        core.debug(JSON.stringify(result));
    }

    async addAssignees(assignees) {
        const { owner, repo, number: issue_number } = this.#context.issue;
        const result = await this.#client.rest.issues.addAssignees({
            owner,
            repo,
            issue_number,
            assignees,
        });
        core.debug(JSON.stringify(result));
    }

    hasAnyLabel(labels) {
        if (!this.#context.payload.pull_request) {
            return false;
        }
        const { labels: pullRequestLabels = [] } = this.#context.payload.pull_request;
        return pullRequestLabels.some((label) => labels.includes(label.name));
    }
}

//------------- handler

async function handlePullRequest(client, context, config) {
    if (!context.payload.pull_request) {
        throw new Error("the webhook payload is not exist");
    }

    const { pull_request: event } = context.payload;
    const { title, draft, user, number } = event;
    const {
        skipKeywords,
        useReviewGroups,
        useAssigneeGroups,
        reviewGroups,
        assigneeGroups,
        addReviewers,
        addAssignees,
        filterLabels,
        runOnDraft,
    } = config;

    if (skipKeywords && includesSkipKeywords(title, skipKeywords)) {
        core.info(
            "Skips the process to add reviewers/assignees since PR title includes skip-keywords",
        );
        return;
    }
    if (!runOnDraft && draft) {
        core.info("Skips the process to add reviewers/assignees since PR type is draft");
        return;
    }

    if (useReviewGroups && !reviewGroups) {
        throw new Error(
            "Error in configuration file to do with using review groups. Expected 'reviewGroups' variable to be set because the variable 'useReviewGroups' = true.",
        );
    }

    if (useAssigneeGroups && !assigneeGroups) {
        throw new Error(
            "Error in configuration file to do with using review groups. Expected 'assigneeGroups' variable to be set because the variable 'useAssigneeGroups' = true.",
        );
    }

    const owner = user.login;
    const pr = new PullRequest(client, context);

    if (filterLabels !== undefined) {
        if (filterLabels.include !== undefined && filterLabels.include.length > 0) {
            const hasLabels = pr.hasAnyLabel(filterLabels.include);
            if (!hasLabels) {
                core.info(
                    "Skips the process to add reviewers/assignees since PR is not tagged with any of the filterLabels.include",
                );
                return;
            }
        }

        if (filterLabels.exclude !== undefined && filterLabels.exclude.length > 0) {
            const hasLabels = pr.hasAnyLabel(filterLabels.exclude);
            if (hasLabels) {
                core.info(
                    "Skips the process to add reviewers/assignees since PR is tagged with any of the filterLabels.exclude",
                );
                return;
            }
        }
    }

    if (addReviewers) {
        try {
            const reviewers = chooseReviewers(owner, config);

            if (reviewers.length > 0) {
                await pr.addReviewers(reviewers);
                await pr.mentionInComments(reviewers);
                core.info(`Added reviewers to PR #${number}: ${reviewers.join(", ")}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                core.warning(error.message);
            }
        }
    }

    if (addAssignees) {
        try {
            const assignees = chooseAssignees(owner, config);

            if (assignees.length > 0) {
                await pr.addAssignees(assignees);
                core.info(`Added assignees to PR #${number}: ${assignees.join(", ")}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                core.warning(error.message);
            }
        }
    }
}

// ------------ run

async function run() {
    try {
        const token = core.getInput("repo-token", { required: true });
        const configPath = core.getInput("configuration-path", {
            required: true,
        });

        const client = github.getOctokit(token);
        const { repo, sha } = github.context;
        const config = await fetchConfigurationFile(client, {
            owner: repo.owner,
            repo: repo.repo,
            path: configPath,
            ref: sha,
        });

        await handlePullRequest(client, github.context, config);
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}

run();
