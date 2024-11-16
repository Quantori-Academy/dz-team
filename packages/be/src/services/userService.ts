import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { publicUserSchema, RegisterUser, UpdateUser } from "../../../shared/zodSchemas";
import { z } from "zod";

const prisma = new PrismaClient();

export class UserService {
    /**
     * Get all users including passwords.
     * @returns {Promise<UserSchema[]>} A list of users including passwords.
     */
    async getAllUsers(): Promise<z.infer<typeof publicUserSchema>[]> {
        const users = await prisma.user.findMany(); // Fetch all users

        // Validate the returned data with UserSchema
        return users.map((user) => publicUserSchema.parse(user)); // Parse each user into UserSchema
    }

    /**
     * Get a single user by ID with role-based access control.
     * @param userId - The ID of the user to retrieve.
     * @param requesterId - The ID of the user making the request.
     * @param requesterRole - The role of the user making the request.
     * @returns The user data or null if not found.
     */
    async getSingleUser(
        userId: string,
        requesterId: string,
        requesterRole: string,
    ): Promise<z.infer<typeof publicUserSchema> | null> {
        if (requesterRole === "admin") {
            // Admin can access any user's data
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            return user ? publicUserSchema.parse(user) : null;
        } else if (requesterRole === "researcher" || requesterRole === "procurementOfficer") {
            // Non-admin users can only access their own data
            if (userId !== requesterId) {
                throw new Error("Unauthorized: Insufficient permissions.");
            }
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            return user ? publicUserSchema.parse(user) : null;
        } else {
            throw new Error("Unauthorized: Insufficient permissions.");
        }
    }

    // Check unique credentials
    async getUserByUsernameOrEmail(username: string, email: string) {
        return prisma.user.findFirst({
            where: {
                OR: [{ username: username }, { email: email }],
            },
        });
    }

    /**
     * Register a new user.
     * @param {RegisterUser} userData - The data to create a new user.
     * @returns {Promise<Omit<RegisterUser, 'password' | 'confirmPassword'> | null>} The newly registered user without the password.
     * @throws {Error} If passwords do not match or the user already exists.
     */
    async createUser(
        userData: RegisterUser,
    ): Promise<Omit<RegisterUser, "password" | "confirmPassword"> | null> {
        const existingUser = await this.getUserByUsernameOrEmail(userData.username, userData.email);
        if (existingUser) {
            throw new Error("Username or email already in use.");
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Make new user data without confirm password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...userDataWithoutConfirmPassword } = userData;

        // Create the user in the database with the hashed password
        const newUser = await prisma.user.create({
            data: {
                ...userDataWithoutConfirmPassword, // user data without confirm password
                password: hashedPassword, // Replace password with hashed password
            },
        });

        // Return the created user without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    /**
     * Update user profile with role-based access control.
     * @param userId - The ID of the user to update.
     * @param userData - Data to update (only allowed fields based on role).
     * @param requesterId - ID of the user making the request.
     * @param requesterRole - Role of the user making the request.
     * @returns Updated user data without sensitive fields.
     */
    async updateUser(
        userId: string,
        userData: UpdateUser,
        requesterId: string,
        requesterRole: string,
    ): Promise<{ user: UpdateUser | null; mustChangePassword: boolean }> {
        const userToUpdate = await prisma.user.findUnique({ where: { id: userId } });

        if (!userToUpdate) throw new Error("User not found.");

        // Initialize the mustChangePassword
        let mustChangePassword = false;

        // Define updatable fields based on role
        const isSelfUpdate = userId === requesterId;
        if (requesterRole === "admin") {
            // Check if admin is updating their own profile or another user's profile
            if (!isSelfUpdate) {
                // Handle update for a different user
                if (userData.password) {
                    userData.password = await bcrypt.hash(userData.password, 10);
                    mustChangePassword = true; // Set mustChangePassword if password is changed by admin
                }
            } else {
                delete userData.role; // Prevent admins from changing their own role
            }
        } else if (requesterRole === "researcher" || requesterRole === "procurementOfficer") {
            if (!isSelfUpdate) throw new Error("Unauthorized: Insufficient permissions.");

            // Restrict fields for non-admins
            const { firstName, lastName, email, password } = userData;
            userData = { firstName, lastName, password, email };
            if (password) {
                userData.password = await bcrypt.hash(password, 10);
                mustChangePassword = false; // Set mustChangePassword if password is changed by user
            }
        } else {
            throw new Error("Unauthorized: Insufficient permissions.");
        }

        // Ensure at least one admin remains in the system
        if (
            requesterRole === "admin" &&
            userToUpdate.role === "admin" &&
            userData.role !== "admin"
        ) {
            const adminCount = await prisma.user.count({ where: { role: "admin" } });
            if (adminCount <= 1) throw new Error("At least one admin must remain.");
        }

        // Perform the update
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...userData,
            },
        });

        // Return updated user without password and the mustChangePassword flag

        const { ...userWithoutPassword } = updatedUser;
        return { user: userWithoutPassword, mustChangePassword };
    }

    /**
     * Delete a user by their userId.
     * @param {string} userId - The ID of the user to delete.
     * @returns {Promise<boolean>} True if the user was deleted, false if not found.
     */
    async deleteUser(userId: string): Promise<boolean> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.role === "admin") {
            const adminCount = await prisma.user.count({ where: { role: "admin" } });
            if (adminCount === 1) {
                return false;
            }
        }
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        return !!deletedUser; // Return true if user is deleted, false otherwise
    }
}
