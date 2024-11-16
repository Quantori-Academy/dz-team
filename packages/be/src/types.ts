import {
    FastifyInstance,
    FastifyBaseLogger,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    FastifyRequest,
    FastifyReply,
} from "fastify";

import type { FastifyZodOpenApiTypeProvider } from "fastify-zod-openapi";

// Define the JWT payload type with roles
export interface JwtPayload {
    userId: string; // or number, depending on your user ID type
    role: "admin" | "procurementOfficer" | "researcher"; // Define role types explicitly here
}

// Extend FastifyRequest to include user property
declare module "fastify" {
    interface FastifyRequest {
        jwtSign: (payload: object) => Promise<string>;
        userData?: JwtPayload; // Add user property of type JwtPayload
    }
}

// Define the Roles enum
export enum Roles {
    ADMIN = "admin",
    PROCUREMENT_OFFICER = "procurementOfficer",
    RESEARCHER = "researcher",
}

// Extend FastifyZodInstance with custom decorators
export type FastifyZodInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    FastifyZodOpenApiTypeProvider
> & {
    verifyJWT?: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    verifyRole?: (
        request: FastifyRequest,
        reply: FastifyReply,
        requiredRoles: Array<JwtPayload["role"]>,
    ) => Promise<void>;
};
