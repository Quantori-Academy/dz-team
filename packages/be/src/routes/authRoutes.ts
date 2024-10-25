import { FastifyZodInstance } from "../types";

import { RegisterUser, registerUserSchema } from "../../../shared/zodSchemas";

import { AuthController } from "../controllers/authController";

const authController = new AuthController();

/**
 * Registers the authentication routes with the provided Fastify instance.
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const authRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * @route POST /register
     * @tags Auth
     * @summary Register a new user.
     * @param {RegisterUser} request.body.required - User data to register
     * @returns {User} 201 - The created user
     * @returns {Error} 400 - Validation error
     */
    app.post<{ Body: RegisterUser }>(
        "/register",
        { schema: { tags: ["Auth"], body: registerUserSchema } },
        async (request, reply) => {
            return await authController.register(request, reply);
        },
    );
};
