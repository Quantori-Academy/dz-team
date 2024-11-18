import { FastifyZodInstance, Roles } from "../types";

import { UserController } from "../controllers/userController";
import { checkAuthenticated, checkAuthenticatedAndRole } from "../utils/authCheck";
import {
    RegisterUser,
    registerUserSchema,
} from "../../../shared/zodSchemas/user/registerUserSchema";
import { UpdateUser, updateUserSchema } from "../../../shared/zodSchemas/user/updateUserSchema";

const userController = new UserController();

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
            schema: { tags: ["Users"] },
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
            schema: { tags: ["Users"] },
            preHandler: [checkAuthenticated()],
        },
        async (request, reply) => {
            return await userController.getSingleUser(request, reply);
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
            schema: { tags: ["Users"], body: registerUserSchema },
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
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
            schema: { tags: ["Users"], body: updateUserSchema },
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
            schema: { tags: ["Users"] },
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
            schema: { tags: ["Users"] },
            preHandler: [
                async (request, reply) => {
                    // Ensure verifyJWT and verifyRole exist, otherwise block the request
                    if (!app.verifyJWT) {
                        reply.code(500).send({
                            error: "Authentication or authorization method not available",
                        });
                        throw new Error(
                            "Required authentication or authorization method not registered.",
                        );
                    }

                    await app.verifyJWT(request, reply);
                },
            ],
        },
        async (request, reply) => {
            return await userController.getCurrentUser(request, reply);
        },
    );
};
