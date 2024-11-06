import { FastifyRequest, FastifyReply } from "fastify";

import { RegisterUser, registerUserSchema, UpdateUser } from "../../../shared/zodSchemas";

import { UserService } from "../services/userService";

import { sendErrorResponse } from "../utils/handleErrors";

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
            sendErrorResponse(reply, error, "Failed to retrieve users");
        }
    }

    /**
     * Get a single user by their userId with role-based access control.
     * @param request - FastifyRequest containing the userId as a parameter.
     * @param reply - FastifyReply
     * @returns A promise that resolves to the user data or an error.
     */
    async getSingleUser(
        request: FastifyRequest<{ Params: { userId: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const { userId } = request.params;
            const requesterId = request.userData?.userId;
            const requesterRole = request.userData?.role;

            // Ensure request userId and role are available
            if (!requesterId || !requesterRole) {
                return reply.status(401).send({ message: "Unauthorized" });
            }

            // Attempt to get the user through the UserService
            const user = await userService.getSingleUser(userId, requesterId, requesterRole);

            if (user) {
                return reply.status(200).send(user);
            } else {
                return reply.status(404).send({ message: "User not found" });
            }
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to retrieve user");
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
            sendErrorResponse(reply, error, "User registration failed");
        }
    }

    /**
     * Update user profile with role-based access control.
     * @param request - FastifyRequest containing user data and token with user ID and role.
     * @param reply - FastifyReply
     * @returns Updated user data or error.
     */
    async updateUser(
        request: FastifyRequest<{ Params: { userId: string }; Body: UpdateUser }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const { userId } = request.params;
            const { body: userData } = request;
            const requesterId = request.userData?.userId;
            const requesterRole = request.userData?.role;

            // Ensure request userId and role are available
            if (!requesterId || !requesterRole)
                return reply.status(401).send({ message: "Unauthorized" });

            // Attempt update through the UserService
            const updatedUser = await userService.updateUser(
                userId,
                userData,
                requesterId,
                requesterRole,
            );
            reply.status(200).send(updatedUser);
        } catch (error) {
            sendErrorResponse(reply, error, "User update failed");
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
            sendErrorResponse(reply, error, "User deletion failed");
        }
    }
}
