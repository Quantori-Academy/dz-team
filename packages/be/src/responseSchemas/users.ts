import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import { publicUserSchema } from "shared/zodSchemas/user/publicUserSchema";
import { registerUserSchema } from "shared/zodSchemas/user/registerUserSchema";
import { updateUserSchema } from "shared/zodSchemas/user/updateUserSchema";

const userIdParam = z.object({ userId: z.string().describe("User's UUID.") });

export const UsersListSchema = z.array(publicUserSchema);
const unauthorizedResponse = {
    description: "Error - Unauthorized.",
    content: {
        "application/json": {
            schema: z.object({
                statusCode: z.number().default(401),
                code: z.string().default("FST_JWT_NO_AUTHORIZATION_IN_HEADER"),
                error: z.string().default("Unauthorized"),
                message: z.string().default("No Authorization was found in request.headers"),
            }),
        },
    },
};
const userNotFoundResponse = {
    description: "Error - User not found.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("User not found"),
            }),
        },
    },
};

const badRequestResponse = {
    description: "Error - Bad request.",
    content: {
        "application/json": {
            schema: z.object({
                statusCode: z.number().default(400),
                code: z.string().default("FST_ERR_VALIDATION"),
                error: z.string().default("Bad Request"),
                message: z
                    .string()
                    .default("body/password Password must be at least 8 characters long."),
            }),
        },
    },
};

const serverFailure = {
    description: "Error - Update failed.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("User update failed"),
            }),
        },
    },
};

export const GET_USERS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a list of users",
    description: "Retrieve all available users in the system.",
    tags: ["Users"],
    response: {
        200: {
            description: "List of users.",
            content: {
                "application/json": {
                    schema: UsersListSchema,
                },
            },
        },
        401: unauthorizedResponse,
    },
};

export const GET_USER_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves user by id",
    description: "Retrieve a specific user by id.",
    params: userIdParam,
    tags: ["Users"],
    response: {
        200: {
            description: "User's details.",
            content: {
                "application/json": {
                    schema: publicUserSchema,
                },
            },
        },
        401: unauthorizedResponse,
        404: userNotFoundResponse,
    },
};

export const POST_NEW_USER_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Creates new user",
    description: "Create user in the system.",
    tags: ["Users"],
    body: registerUserSchema.innerType(),
    response: {
        201: {
            description: "Created user's details.",
            content: {
                "application/json": {
                    schema: publicUserSchema,
                },
            },
        },
        400: badRequestResponse,
        401: unauthorizedResponse,
    },
};

export const UPDATE_USER_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Updates user details by id",
    description: "Update user information by id.",
    params: userIdParam,
    tags: ["Users"],
    body: updateUserSchema,
    response: {
        200: {
            description: "Updated user information.",
            content: {
                "application/json": {
                    schema: publicUserSchema,
                },
            },
        },
        500: serverFailure,
        400: badRequestResponse,
        401: unauthorizedResponse,
        404: userNotFoundResponse,
    },
};

export const DELETE_USER_BY_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Deletes user by id",
    description: "Delete a specific user by id.",
    params: userIdParam,
    tags: ["Users"],
    response: {
        204: {
            description: "User deleted successfully.",
            content: {
                "application/json": {
                    schema: z.object({ message: z.string().default("User deleted successfully") }),
                },
            },
        },
        401: unauthorizedResponse,
        404: userNotFoundResponse,
    },
};
