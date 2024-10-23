import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { RegisterUser, registerUserSchema } from "shared/zodSchemas";

import { AuthService } from "../services/authService";

const authService = new AuthService();

export class AuthController {
    /**
     * Register a new user.
     * @param request - FastifyRequest containing the user data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the created User object without the password.
     */
    async register(
        request: FastifyRequest<{ Body: RegisterUser }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            // Check validated data according to registerUserSchema
            const parsedData = registerUserSchema.parse(request.body);

            // Call the AuthService to register the user, passing the data to the service
            const newUser = await authService.register(parsedData);

            // Respond with the created user, omitting the password
            reply.status(201).send(newUser);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            if (error instanceof Error) {
                // Return a 409 Conflict status for registration issues (e.g., username/email already in use)
                return reply.status(409).send({ message: error.message });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }
}
