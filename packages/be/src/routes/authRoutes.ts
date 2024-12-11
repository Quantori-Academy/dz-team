// Internal types
import { FastifyZodInstance } from "../types";

// Controllers
import { authController } from "../controllers/authController";

// External dependencies
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";

// Response schemas
import { POST_USER_AUTH_SCHEMA } from "../responseSchemas/auth";

// Shared schemas
import { LoginUser } from "../../../shared/zodSchemas/user/loginUserSchema";

/**
 * Registers the authentication routes with the provided Fastify instance.
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const authRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * @route POST /login
     * @summary Log in a user.
     * @tags Auth
     * @param {object} request.body.required - User credentials for login
     * @param {string} request.body.username.required - The username of the user
     * @param {string} request.body.password.required - The user's password
     * @returns {object} 200 - A JWT token if authentication is successful
     * @returns {Error} 401 - Invalid username or password
     * @returns {Error} 400 - Validation error for missing or incorrect fields
     */
    app.post<{ Body: LoginUser }>(
        "/login",

        {
            schema: POST_USER_AUTH_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await authController.login(request, reply);
        },
    );
};
