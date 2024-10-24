import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { RegisterUser } from "shared/zodSchemas";

const prisma = new PrismaClient();

export class AuthService {
    // Check  unique credentials
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
     * @throws {Error} If passwords do not match.
     */
    async register(
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
}
