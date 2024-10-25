import { FastifyZodInstance } from "../types";

import { RegisterUser, registerUserSchema } from "shared/zodSchemas";

import { UserController } from "../controllers/userController";

const userController = new UserController();

/**
 * Registers the authentication routes with the provided Fastify instance.
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const userRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * @route GET /users
     * @tags Auth
     * @summary Retrieve all users including passwords.
     * @returns {Array<RegisterUser>} 200 - A list of users including passwords
     * @returns {Error} 500 - Internal server error
     */
    app.get("/", { schema: { tags: ["Users"] } }, async (request, reply) => {
        return await userController.getAllUsers(request, reply);
    });

    /**
     * @route POST /users
     * @tags Auth
     * @summary Register a new user.
     * @param {RegisterUser} request.body.required - User data to register
     * @returns {User} 201 - The created user
     * @returns {Error} 400 - Validation error
     */
    app.post<{ Body: RegisterUser }>(
        "/",
        { schema: { tags: ["Users"], body: registerUserSchema } },
        async (request, reply) => {
            return await userController.createUser(request, reply);
        },
    );

    /**
     * @route DELETE /users/{userId}
     * @tags Auth
     * @summary Delete a user by ID.
     * @param {string} userId.path.required - ID of the user to delete
     * @returns {boolean} 200 - Indicates success
     * @returns {Error} 404 - User not found
     */
    app.delete<{ Params: { userId: string } }>(
        "/:userId",
        { schema: { tags: ["Users"] } },
        async (request, reply) => {
            return await userController.deleteUser(request, reply);
        },
    );
};
