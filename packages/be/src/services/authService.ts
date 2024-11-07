import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { LoginUser } from "../../../shared/zodSchemas";
import { JwtPayload } from "../types";

const prisma = new PrismaClient();

export class AuthService {
    /**
     * Log in a user by verifying credentials.
     * @param userData - The login data including username and password.
     * @param jwtSign - The Fastify JWT sign function.
     * @returns A JWT token if authentication is successful.
     */
    async login(
        userData: LoginUser, // Use the LoginUser type here
        jwtSign: (payload: JwtPayload, options?: { expiresIn: string }) => string,
    ): Promise<{ token: string }> {
        const { username, password } = userData; // Destructure username and password

        // Find user by username only
        const user = await prisma.user.findFirst({
            where: { username },
        });

        if (!user) {
            throw new Error("Invalid username or password.");
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid username or password.");
        }

        // Update lastLogin to the current date and time
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginDate: new Date() },
        });

        // Generate a JWT token using Fastify's jwtSign method
        const token = jwtSign({ userId: user.id, role: user.role });

        return { token };
    }
}
