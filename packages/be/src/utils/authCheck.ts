import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyZodInstance, Roles } from "../types";

export const checkAuthenticated = () => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const verifyJWT = (request.server as unknown as FastifyZodInstance).verifyJWT;

        if (!verifyJWT) {
            reply.code(500).send({
                error: "Authentication method not available",
            });
            throw new Error("Required authentication method not registered.");
        }

        await verifyJWT(request, reply);
    };
};

export const checkAuthenticatedAndRole = (roles: Roles[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        await checkAuthenticated()(request, reply);

        const verifyRole = (request.server as unknown as FastifyZodInstance).verifyRole;

        if (!verifyRole) {
            reply.code(500).send({
                error: "Authorization method not available",
            });
            throw new Error("Required authorization method not registered.");
        }

        await verifyRole(request, reply, roles);
    };
};
