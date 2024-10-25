import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { LoginUser, RegisterUser } from "shared/zodSchemas";

const prisma = new PrismaClient();

export class AuthService {
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

    /**
     * Log in a user by verifying credentials.
     * @param userData - The login data including username and password.
     * @param jwtSign - The Fastify JWT sign function.
     * @returns A JWT token if authentication is successful.
     */
    async login(
        userData: LoginUser, // Use the LoginUser type here
        jwtSign: (payload: object) => string,
    ): Promise<{ token: string }> {
        const { username, password } = userData; // Destructure username and password

        // Find user by username only
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new Error("Invalid username or password.");
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid username or password.");
        }

        // Generate a JWT token using Fastify's jwtSign method
        const token = jwtSign({ userId: user.id });

        return { token };
    }
}
