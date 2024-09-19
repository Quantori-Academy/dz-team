## Introduction

This is the backend service for the Mayfly project. It is a Fastify server written in TypeScript, with a Postgres database and Prisma ORM. The server is responsible for handling all API requests and interfacing with the database.

## Getting started

1. Follow the instructions in the [root README](../../README.md) to set up the monorepo.
2. You can immediately start the server with `yarn dev` to test the installation.
3. To set up the database, follow the instructions in the [Database](#Database) section.

## Database
### Prerequisites
* All dependencies installed. `yarn` or `yarn install` in the monorepo root.
* Docker and Docker Compose installed. [Docker installation guide](https://docs.docker.com/get-docker/) - Docker Desktop includes Docker Engine, Docker CLI and Docker Compose

We use Docker to run the database in a container for local development. This allows us to have a consistent environment across all developers and ensures that the database is isolated from the host system.

### Local development
1. Create `.env` file. Take the contents of `.env.example` and paste it into `.env`
2. Build the DB image with `yarn db:build` in the `be` package
3. Run the DB via `yarn dev:db` in the `be` package (this will build and run the db docker container, run migrations, start up the server and prisma studio - a GUI for the database). Alternatively, you can run `yarn db` and `yarn dev` separately, without prisma studio.
4. Database runs in a docker container in detached mode (in the background). Remember to stop the container when you are done with `yarn db:stop`, `docker-compose down` or with a GUI of your choice (Docker Desktop, Docker VSCode extension, etc.)

### View DB
When the database and Prisma Studio are running (via `yarn dev:db` or `yarn db` and `yarn studio`), open a browser and navigate to `http://localhost:5555/` to view the database. You can interact with the database directly from Prisma Studio GUI.
