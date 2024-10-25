import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { RegisterUser } from "shared/zodSchemas";
import { UserSchema } from "shared/generated/zod/modelSchema/UserSchema";
import { z } from "zod";

const prisma = new PrismaClient();

export class UserService {
    /**
     * Get all users including passwords.
     * @returns {Promise<UserSchema[]>} A list of users including passwords.
     */
    async getAllUsers(): Promise<z.infer<typeof UserSchema>[]> {
        const users = await prisma.user.findMany(); // Fetch all users

        // Validate the returned data with UserSchema
        return users.map((user) => UserSchema.parse(user)); // Parse each user into UserSchema
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
     * Delete a user by their userId.
     * @param {string} userId - The ID of the user to delete.
     * @returns {Promise<boolean>} True if the user was deleted, false if not found.
     */
    async deleteUser(userId: string): Promise<boolean> {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        return !!deletedUser; // Return true if user is deleted, false otherwise
    }
}
