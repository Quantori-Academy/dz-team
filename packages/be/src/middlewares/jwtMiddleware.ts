import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyZodInstance } from "../types";

export const jwtMiddleware = (server: FastifyZodInstance) => {
    server.decorate("verifyJWT", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify(); // Verify the JWT token
        } catch (err) {
            reply.send(err); // Handle verification errors
        }
    });
};
