import { FastifyZodInstance } from "../types";
import { LoginUser, loginUserSchema } from "shared/zodSchemas";
import { AuthController } from "../controllers/authController";

const authController = new AuthController();

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
            schema: {
                tags: ["Auth"],
                security: [], // Ensures that endpoint won't be locked
                body: loginUserSchema,
                response: {
                    200: {
                        description: "A JWT token if authentication is successful",
                        type: "object",
                        properties: {
                            token: { type: "string" },
                        },
                        example: {
                            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                        },
                    },
                    400: {
                        description: "Validation error for missing or incorrect fields",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    401: {
                        description: "Invalid username or password",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            return await authController.login(request, reply);
        },
    );
};
