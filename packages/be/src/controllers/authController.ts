import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { LoginUser, loginUserSchema } from "../../../shared/zodSchemas/user/loginUserSchema";
import { authService } from "../services/authService";

class AuthController {
    /**
     * Handle user login.
     * @param request - FastifyRequest containing the login data in the body.
     * @param reply - FastifyReply for sending responses.
     */
    async login(
        request: FastifyRequest<{ Body: LoginUser }>, // Use the LoginUser type here
        reply: FastifyReply,
    ): Promise<void> {
        try {
            // Validate the request body against the loginUserSchema
            const parsedData = loginUserSchema.parse(request.body);

            // Use an arrow function to bind the jwt.sign method
            const jwtSign = (payload: object) => request.server.jwt.sign(payload);

            // Call AuthService to perform login and pass the bound jwtSign function
            const token = await authService.login(parsedData, jwtSign); // Pass parsedData

            // Respond with the generated JWT token
            reply.status(200).send(token);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            if (error instanceof Error) {
                // Respond with 401 for authentication failures
                return reply.status(401).send({ message: error.message });
            }
            // Respond with 500 for internal server errors
            return reply.status(500).send({ message: "Internal server error" });
        }
    }
}

export const authController = new AuthController();
