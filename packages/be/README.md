## Prerequisites
1. All dependencies installed. `npm install` in the monorepo root.
2. Docker and Docker compose installed on the host machine.

## Local development
1. Create `.env` file. Take the contents of `.env.example` and paste it into `.env`
2. Run the DB via `docker compose up -d`
3. Run the server code via `yarn dev:watch`

## View DB
To view DB you can use [adminer](localhost:8080). Use the following values for the login form:

| Field | Value |
|------- | -------------------------------------|
| System    | PostgreSQL |
| Server    | db |
| Username  | `$POSTGRES_USER` value from `.env` |
| Password  | `$POSTGRES_PASSWORD` value from `.env` |
| Database  | lims |
