import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyZodInstance, JwtPayload, Roles } from "../types";

/**
 * JWT Middleware for Fastify to handle authentication and role-based access control.
 *
 * @param {FastifyZodInstance} server - The Fastify instance with Zod integration.
 */
export const jwtMiddleware = (server: FastifyZodInstance) => {
    /**
     * Middleware to verify JWT tokens.
     *
     * @param {FastifyRequest} request - The Fastify request object.
     * @param {FastifyReply} reply - The Fastify reply object.
     * @returns {Promise<void>} A promise that resolves when the token is verified.
     * @throws {Error} Throws an error if the token verification fails.
     */
    server.decorate("verifyJWT", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify(); // Verify JWT token
            request.userData = request.user as JwtPayload; // Cast `user` as JwtPayload
        } catch (err) {
            reply.send(err); // Handle verification errors
        }
    });

    /**
     * Middleware for role-based access control.
     *
     * @param {FastifyRequest} request - The Fastify request object.
     * @param {FastifyReply} reply - The Fastify reply object.
     * @param {Roles[]} requiredRoles - An array of roles required for access.
     * @returns {Promise<void>} A promise that resolves if the user has the required role.
     * @throws {Error} Throws an error if the user does not have the required role or if token verification fails.
     */
    server.decorate(
        "verifyRole",
        async (request: FastifyRequest, reply: FastifyReply, requiredRoles: Roles[]) => {
            try {
                await request.jwtVerify();
                request.user = request.user as JwtPayload;
                const userRole = request.userData?.role;

                // Check if the user's role is in the required roles array
                if (!requiredRoles.includes(userRole as Roles)) {
                    reply.status(403).send({ error: "Access denied" });
                }
            } catch (err) {
                reply.send(err);
            }
        },
    );
};
