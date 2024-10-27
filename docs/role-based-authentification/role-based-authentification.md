# Role-Based Authentication (RBAC) with Fastify

This document outlines the implementation of Role-Based Access Control (RBAC) in our Fastify application. The goal is to ensure that users can only access resources according to their assigned roles.

## Overview

In our application, we use JWT (JSON Web Tokens) for authentication and role-based access control. Users are assigned specific roles that determine their access levels to different routes within the application.

### Key Concepts

- **JWT Verification**: Each request that requires authentication must include a valid JWT in the `Authorization` header.
- **Roles**: Users can have one of several roles (e.g., `admin`, `procurementOfficer`, `researcher`). Each role has specific permissions associated with it.
- **Middleware**: We use middleware to handle JWT verification and role checking before accessing protected routes.

## Role Definitions

The following roles are defined in the application:

- `admin`: Has full access to all routes, including user management.
- `procurementOfficer`: Can manage procurement-related tasks.
- `researcher`: Can access research-related resources.

## Roles Enum

The `Roles` enum is defined in `type.ts`, which provides a centralized way to manage and refer to user roles throughout the application. Here’s the enum definition:

## Usage
```typescript
    app.get(
    "/users",
    {
        preHandler: [
            async (request, reply) => {
                await app.verifyJWT(request, reply); // Verify the JWT token
                await app.verifyRole(request, reply, [Roles.ADMIN]); // Check if the user has ADMIN role
            },
        ],
    },
    async (request, reply) => {
        return await userController.getAllUsers(request, reply); // Handler to retrieve all users
    }
);
```
- Use `await app.verifyJWT(request, reply);` only if you need to verify that the user is logged in and the roles are not important.
- If the route is open, the `preHandler` is not necessary.
- The array of roles may contain one, two, or three roles.
 
- Roles list is available in `types.ts` and it is accessible via import, for example `import { Roles } from "../types";`
```typescript
// type.ts
export enum Roles {
    ADMIN = "admin",
    PROCUREMENT_OFFICER = "procurementOfficer",
    RESEARCHER = "researcher",
}
```

  