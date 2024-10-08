/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 182:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 530:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 218:
/***/ ((module) => {

module.exports = eval("require")("confbox");


/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = eval("require")("lodash.samplesize");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__nccwpck_require__.r(__webpack_exports__);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(182);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nccwpck_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(530);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nccwpck_require__.n(_actions_github__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_samplesize__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(853);
/* harmony import */ var lodash_samplesize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nccwpck_require__.n(lodash_samplesize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var confbox__WEBPACK_IMPORTED_MODULE_3__ = __nccwpck_require__(218);
/* harmony import */ var confbox__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nccwpck_require__.n(confbox__WEBPACK_IMPORTED_MODULE_3__);






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

    return lodash_samplesize__WEBPACK_IMPORTED_MODULE_2___default()(filteredCandidates, desiredNumber);
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
    const config = (0,confbox__WEBPACK_IMPORTED_MODULE_3__.parseYAML)(configString);

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
        _actions_core__WEBPACK_IMPORTED_MODULE_0__.debug(JSON.stringify(result));
    }

    async addReviewers(reviewers) {
        const { owner, repo, number: pull_number } = this.#context.issue;
        const result = await this.#client.rest.pulls.requestReviewers({
            owner,
            repo,
            pull_number,
            reviewers: [reviewers[0]], // only one reviewer can be added for our organization
        });
        _actions_core__WEBPACK_IMPORTED_MODULE_0__.debug(JSON.stringify(result));
    }

    async addAssignees(assignees) {
        const { owner, repo, number: issue_number } = this.#context.issue;
        const result = await this.#client.rest.issues.addAssignees({
            owner,
            repo,
            issue_number,
            assignees,
        });
        _actions_core__WEBPACK_IMPORTED_MODULE_0__.debug(JSON.stringify(result));
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
        _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(
            "Skips the process to add reviewers/assignees since PR title includes skip-keywords",
        );
        return;
    }
    if (!runOnDraft && draft) {
        _actions_core__WEBPACK_IMPORTED_MODULE_0__.info("Skips the process to add reviewers/assignees since PR type is draft");
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
                _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(
                    "Skips the process to add reviewers/assignees since PR is not tagged with any of the filterLabels.include",
                );
                return;
            }
        }

        if (filterLabels.exclude !== undefined && filterLabels.exclude.length > 0) {
            const hasLabels = pr.hasAnyLabel(filterLabels.exclude);
            if (hasLabels) {
                _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(
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
                _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`Added reviewers to PR #${number}: ${reviewers.join(", ")}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                _actions_core__WEBPACK_IMPORTED_MODULE_0__.warning(error.message);
            }
        }
    }

    if (addAssignees) {
        try {
            const assignees = chooseAssignees(owner, config);

            if (assignees.length > 0) {
                await pr.addAssignees(assignees);
                _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`Added assignees to PR #${number}: ${assignees.join(", ")}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                _actions_core__WEBPACK_IMPORTED_MODULE_0__.warning(error.message);
            }
        }
    }
}

// ------------ run

async function run() {
    try {
        const token = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("repo-token", { required: true });
        const configPath = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("configuration-path", {
            required: true,
        });

        const client = _actions_github__WEBPACK_IMPORTED_MODULE_1__.getOctokit(token);
        const { repo, sha } = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context;
        const config = await fetchConfigurationFile(client, {
            owner: repo.owner,
            repo: repo.repo,
            path: configPath,
            ref: sha,
        });

        await handlePullRequest(client, _actions_github__WEBPACK_IMPORTED_MODULE_1__.context, config);
    } catch (error) {
        if (error instanceof Error) {
            _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(error.message);
        }
    }
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;