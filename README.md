# Project Luna

Project Luna is a Laboratory Information Management System (LIMS) for the [Mayfly Project](https://github.com/Quantori-Academy). It aims to enhance laboratory management experience, workflow efficiency, overall productivity, and guarantee data integrity.

## Features

-   [ ] User authentication and authorization with role-based access control
-   [ ] Sample tracking and management
-   [ ] Substances management
-   [ ] Equipment management
-   [ ] Storage management
-   [ ] Laboratories management
-   [ ] Reports and statistics generation

## Getting started

1. Clone the repository
2. Open project root directory in an IDE of your choice
3. Run `yarn` to install dependencies - see more in the [Package manager and monorepo](#package-manager-and-monorepo) section
4. Run `yarn dev` to start the development server
5. Open `http://localhost:5173` in your browser to see the app
6. For development with a local database, you need to follow the instructions in the **Database** section in the [backend README](packages/be/README.md) - short version is: install and start docker, run `yarn dev:db`, stop with `yarn stop:db`

## Vibes and mindset

This project is a part of Quantori Academy JS course 2024, set to mimic a real-world project experience. **'Realistic'** means we're going for a quality product in a predefined time frame.

We're not aiming for perfection - it's 1) impossible and b) unnecessary.
We're aiming for a quality product, realistic workflow, good developer experience and many opportunities to learn and grow.
We're building a cool, complicated thing, working as a team, catching up with great technologies, taking on challenges, making soft and hard mistakes, fixing them and moving on. This should be fun and functional, much like anything we do in life.

Remember to tell your employer the opposite though. Your weaknesses are perfectionism and being an workaholic 😉
(But really, don't do that. I'm just kidding.)

Here are a couple of things to keep in mind:

-   You're smart. When you feel like it, enjoy it. When you don't, know that at the very least you're smart enough. Get a coffee, take a walk, and rock on. You got this.
-   We need team players more than we need geniuses. Unless you're a genius team player, in which case, we need you the most 🚀
-   When you receive feedback, you grow. When you give feedback, you grow even more. Good, constructive, friendly feedback's the best help you can give.
-   Talk! Every team is different, but a team where questions and propositions are discouraged is not a team. It's a dead end. Be brave, make friends, shine yourself and let others shine too. Networking is not overrated.
-   Don't stop. Making mistakes fast is better than not moving at all. If you find yourself stuck on something for >30 minutes of active work, take a break, come back, look again and if no magic happens, ask for help.

## How to work with the project

### Project structure

The project is a monorepo, which means it contains multiple packages in a single repository. So far we have `fe` and `be`, for frontend and backend respectively. Each package has its own `package.json` and `node_modules`, but they share the same `node_modules` in the root directory. See more in [Package manager and monorepo](#package-manager-and-monorepo) section.

It is important(!) to open the project in the root directory, not in `packages/frontend` or `packages/backend`, as IDEs will not recognize the root linter and formatter configs if you open a subdirectory.

### Project scripts

You can call scripts from packages with `yarn workspace <package-name> <script-name>`. For example, to run prisma migration, you can use `yarn workspace be migrate:dev`. Many scripts are already set up in the root `package.json` for convenience, with script names logic following the `command:option` pattern, where command is required, and option is most often just selected package. Commands are `dev` to start the development server, `build` for building, `preview` to check the build and `prod` for production, `lint` and `format` probably don't need explanation.'

## Workflow

Our task management is based on the [Scrum](<https://en.wikipedia.org/wiki/Scrum_(software_development)>) methodology. This is a very common approach in the industry, so getting familiar with it is an extremely valuable experience.

We have 2-week sprints, with a **planning** meeting at the beginning of each sprint, and a **retrospective** at the end. Daily stand-ups are ommited in favor of asynchronous communication in the form of **daily updates in the main [Teams channel](https://teams.microsoft.com/l/channel/19%3A19ef19fc071f4c7faf42475ce85c5769%40thread.tacv2/Team%20of%20Dmitriy%20Zhukov?groupId=c75db1e6-29be-435e-9199-a0c83673a899&tenantId=124ccfbd-07ea-44e3-8794-af8986d63809&ngc=true)**.

We use [GitHub Projects](https://github.com/orgs/Quantori-Academy/projects/10) to manage our tasks and track our progress.

Please make sure to follow the following task workflow:

-   Select a task from the "To do" column
-   Assign yourself to the task
-   Move the task to the "In progress" column
-   Create a new branch with the following naming convention: `feature/feature-name`, `fix/bug-name`, `chore/task-name` or `docs/task-name`
-   Work on the task, commit your changes, and push them to GitHub
-   If you need any help with the task, create a pull request and message the team in the main Teams channel or ping a mentor
-   Once the task is completed, create a pull request, then move the task to "In Review" column
-   Wait for at least one mentor to review your pull request, in case of change requests, make the changes, push and re-request review
-   After at least one mentor has reviewed and approved the pull request, make sure to resolve all the comments and link the pull request to the issue, then merge the PR and move the task to "Done" column

PR flow is reflected in the PR template - you can just follow the #Status section and the checklist there.

## Git workflow

We use [Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). It is a lightweight workflow that inspires team discussions and fits projects where deployments are made regularly. It is also a great way to ensure that the master branch is always in a deployable state.

There are four important rules to follow:

-   **Never push directly to the main branch**. All changes must be made through pull requests - this is how all changes are reviewed and main branch is in the best possible state.
-   **Follow the naming convention for branches**. Use branch folder prefixes like `feature/`, `fix/`, `chore/`, `docs/` - it makes source control cleaner and easier to navigate.
-   **Use squashing**. When merging a pull request, make sure to `squash and merge` the PR - it keeps the commit history easy to read.
-   **Avoid large pull requests**. If a pull request is over 200 lines of meaningful code changes, it's a good idea to split it into smaller, more manageable PRs. Lines of `yarn.lock` changes, generated files and so on don't count, although some specific changes, like formatting or moving files between directories are better off in separate PRs. Try to look at the PR from the reviewer's perspective.

## CI/CD

We use GitHub Actions for continuous integration and continuous deployment. The CI/CD pipeline is minimal in this project. Usually it runs unit and integration tests, deploys the app depending on project deployment strategy, triggers bots, sends notifications to the team, and so on. For our project it builds and deploys the application to the VM on manual trigger.

## Package manager and monorepo

The repository is managed with yarn workspaces. It allows us to manage multiple packages in a single repository, and share dependencies between them - you will see that only `node_modules` in the root directory has the dependencies, and `node_modules` in the packages are symlinks to the root `node_modules`. Most notably for day-to-day work - we only use a top-level linter and formatter (ESLint, Prettier) for both frontend and backend packages.

It is important to use Yarn classic (1.x) - it is an industry standard and it's useful to get the hang of it, and while Yarn modern (3.x, 4.x) has many new features, it's not yet widely adopted mostly due to it's dependency on nodeJS _experimental_ feature Corepack.

Run `npm install yarn -g` to install Yarn classic globally. If you have Corepack enabled, you will have local package manager set to yarn classic as specified in `packageManager` field in `package.json`.

## Coding guidelines

We use ESLint and Prettier for <!-- some --> code quality. They are set up in the root directory, so you can run `yarn lint` and `yarn format` to check and fix your code. We also have pre-commit hooks set up, so you don't have to worry about it - just commit your changes and they will be checked and fixed automatically.

some preferences and good practices:

-   make your variable names semantic, use prefixes like `is-` or `has-` for booleans, verbs for functions, ie `get-` for functions that return a value, and so on
-   split your code into smaller parts, isolate logic, but don't shy away from larger functions if they 'make sense', ie they are bound by context, don't do too many things at once and are easy enough to understand
-   add JSDoc comments to your code when it's not immediately clear what it does, preferably only a general description with no details on parameters and return values - this should be clear from the types and the names
-   use `const` for everything, unless you need to reassign the variable
-   use arrow functions for everything, unless you need `this` or `arguments`
-   do not use `export default` - always use named exports
-   when declaring types in the same module as logic, declare them at the top of the file
-   use camelCase for variables and functions, PascalCase for types and classes
-   use camelCase for file names, and PascalCase for React component file names

## Possible issues

If you encounter anything that blocks you from working on the project for more than 30 minutes, please reach out to the team in the main [Teams channel](https://teams.microsoft.com/l/channel/19%3A19ef19fc071f4c7faf42475ce85c5769%40thread.tacv2/Team%20of%20Dmitriy%20Zhukov?groupId=c75db1e6-29be-435e-9199-a0c83673a899&tenantId=124ccfbd-07ea-44e3-8794-af8986d63809&ngc=true).

That said, here are some things you might encounter:

-   `Cannot find module 'yarn'`: most likely you have no global Yarn classic installed. Run `npm install yarn -g` to install it.
-   ESLint errors on every file: make sure you've opened the project in root directory, not `packages/frontend` or `packages/backend`. IDEs will not recognize the root linter and formatter configs if you open a subdirectory.
-   `Error: P1001: Can't reach database server at localhost:5432` when running `yarn dev:db`: make sure you have Docker installed and running, and that you have no other services running on the same port.
