// External dependencies
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";

// Internal utilities
import { FastifyZodInstance, Roles } from "../types";
import { checkAuthenticated, checkAuthenticatedAndRole } from "../utils/authCheck";

// Controllers
import { userController } from "../controllers/userController";

// OpenAPI response schemas
import {
    DELETE_USER_BY_SCHEMA,
    GET_CURRENT_USER_SCHEMA,
    GET_USER_BY_ID_SCHEMA,
    GET_USERS_SCHEMA,
    POST_NEW_USER_SCHEMA,
    UPDATE_USER_BY_ID_SCHEMA,
} from "../responseSchemas/users";

// Shared schemas
import { RegisterUser } from "../../../shared/zodSchemas/user/registerUserSchema";
import { UpdateUser } from "../../../shared/zodSchemas/user/updateUserSchema";

/**
 * User routes for managing user operations.
 *
 * @param {FastifyZodInstance} app - The Fastify instance with Zod integration.
 * @returns {Promise<void>} A promise that resolves when the routes are registered.
 */
export const userRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / - Retrieve all users.
     *
     * @summary Get all users.
     * @tags Users
     * @security JWT
     * @security Roles.ADMIN
     * @returns {Promise<User[]>} 200 - An array of users.
     */
    app.get(
        "/",
        {
            schema: GET_USERS_SCHEMA satisfies FastifyZodOpenApiSchema,
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await userController.getAllUsers(request, reply);
        },
    );

    /**
     * GET /:userId - Retrieve a single user by ID.
     * @summary Get a single user.
     * @tags Users
     * @security JWT
     * @security Roles.ADMIN, Roles.RESEARCHER, Roles.PROCUREMENT_OFFICER
     * @returns {Promise<User>} 200 - The user object.
     */
    app.get<{ Params: { userId: string } }>(
        "/:userId",
        {
            schema: GET_USER_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema,
            preHandler: [checkAuthenticated()],
        },
        async (request, reply) => {
            return await userController.getUser(request, reply);
        },
    );

    /**
     * POST / - Create a new user.
     *
     * @summary Create a user.
     * @tags Users
     * @param {RegisterUser} request.body.required - User registration data.
     * @security JWT
     * @security Roles.ADMIN
     * @returns {Promise<User>} 201 - The created user.
     */
    app.post<{ Body: RegisterUser }>(
        "/",
        {
            schema: POST_NEW_USER_SCHEMA satisfies FastifyZodOpenApiSchema,
            // preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await userController.createUser(request, reply);
        },
    );

    /**
     * PUT /:userId - Update a user by ID.
     *
     * @summary Update a user.
     * @tags Users
     * @param {string} userId.path.required - ID of the user to update.
     * @param {UpdateUser} request.body.required - Updated user data.
     * @security JWT
     * @returns {Promise<User>} 200 - The updated user.
     */
    app.put<{ Params: { userId: string }; Body: UpdateUser }>(
        "/:userId",
        {
            schema: UPDATE_USER_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema,
            preHandler: [checkAuthenticated()],
        },
        async (request, reply) => {
            return await userController.updateUser(request, reply);
        },
    );

    /**
     * DELETE /:userId - Delete a user by ID.
     *
     * @summary Delete a user.
     * @tags Users
     * @param {string} userId.path.required - ID of the user to delete.
     * @security JWT
     * @security Roles.ADMIN
     * @returns {Promise<void>} 204 - No content.
     */
    app.delete<{ Params: { userId: string } }>(
        "/:userId",
        {
            schema: DELETE_USER_BY_SCHEMA satisfies FastifyZodOpenApiSchema,
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await userController.deleteUser(request, reply);
        },
    );

    /**
     * GET / - Retrieve current users.
     *
     * @summary Get current user.
     * @tags Users
     * @security JWT
     * @returns {Promise<User>} 200 - An array of users.
     */
    app.get(
        "/me",
        {
            schema: GET_CURRENT_USER_SCHEMA satisfies FastifyZodOpenApiSchema,
            preHandler: [checkAuthenticated()],
        },
        async (request, reply) => {
            return await userController.getCurrentUser(request, reply);
        },
    );
};
