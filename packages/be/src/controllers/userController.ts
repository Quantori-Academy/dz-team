import { FastifyRequest, FastifyReply } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { RegisterUser, registerUserSchema } from "shared/zodSchemas";

import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
    /**
     * Get all users including passwords.
     * @param _request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to a list of users including passwords.
     */
    async getAllUsers(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const users = await userService.getAllUsers(); // Call the UserService to get all users
            reply.status(200).send(users); // Respond with the list of users
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

    /**
     * Register a new user.
     * @param request - FastifyRequest containing the user data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the created User object without the password.
     */
    async createUser(
        request: FastifyRequest<{ Body: RegisterUser }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            // Check validated data according to registerUserSchema
            const parsedData = registerUserSchema.parse(request.body);

            // Call the AuthService to register the user, passing the data to the service
            const newUser = await userService.createUser(parsedData);

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

    /**
     * Delete a user by their userId.
     * @param request - FastifyRequest containing the userId as a parameter.
     * @param reply - FastifyReply
     * @returns A promise that resolves to a success message if the user was deleted.
     */
    async deleteUser(
        request: FastifyRequest<{ Params: { userId: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const { userId } = request.params;

            // Call the UserService to delete the user by ID
            const isDeleted = await userService.deleteUser(userId);

            if (isDeleted) {
                return reply.status(200).send({ message: "User deleted successfully" });
            } else {
                return reply.status(404).send({ message: "User not found" });
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                // Handle the Prisma "Record not found" error (P2025)
                return reply.status(404).send({ message: "User not found" });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }
}
