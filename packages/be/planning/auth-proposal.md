# Authentication and Authorization Proposal for Fastify

## Introduction

Authentication and authorization are essential features of our project.Because there is no information about token usage in project recommendation, l recommend using **Fastify Cookie** for session-based authentication and **Fastify Access Control** for role-based authorization. If there would be access tokens we would use **Fastify JWT** for it.

## Recommended Libraries

1. **Fastify Cookie**

    - To manage cookies and store user data, used for session-based authentication.
    - Allows the server to store session information securely.

2. **Fastify Access Control**
    - A plugin to implement role-based access control (RBAC) to easily control permission according user role.

## Implementation Plan

### Authentication Features

1. **User Registration**

    - Allow users to create accounts with a username, first name, last name, email, role and password.
    - Hash passwords using a library like `bcrypt`.

2. **User Login**

    - Authenticate users with username and password, and create a server-side session .
    - Set a secure cookie with session information.

3. **Session Management**

    - Store user sessions in the database or an in-memory store.

4. **User Logout**
    - Clear user data from session and cookie.

### Authorization Features

1. **Role Definition**

    - Define user roles (e.g., Admin, Procurement Officer, Researcher).
    - Store roles in the database with user information.

2. **Role-based Access Control**

    - Implement route-level permissions and make middleware to control protected routes.

3. **Protected Routes**
    - Create routes that require authentication and specific roles.
    - Return appropriate error messages for unauthorized access.

### Task Breakdown

1. **Set Up Fastify with Required Libraries**

    - Install commands like `fastify`, `fastify-cookie`, and `fastify-access-control`.
    - Configure Fastify to use the libraries.

2. **Implement User Registration**

    - Create a registration route.
    - Validate input data.
    - Hash passwords and store user details in the database.

3. **Implement User Login**
    - Create a login route.
    - Validate credentials.
    - Establish a session and set a cookie for the client.

### Docs

[Fastify Cookie](https://github.com/fastify/fastify-cookie)
[Fastify Access Control](https://github.com/fastify/fastify-cors)
