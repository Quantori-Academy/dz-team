import {
    FastifyInstance,
    FastifyBaseLogger,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    FastifyRequest,
    FastifyReply,
} from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";

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

export type SearchResults<T> = {
    data: T[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

// Extend FastifyZodInstance with custom decorators
export type FastifyZodInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    ZodTypeProvider
> & {
    verifyJWT?: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    verifyRole?: (
        request: FastifyRequest,
        reply: FastifyReply,
        requiredRoles: Array<JwtPayload["role"]>,
    ) => Promise<void>;
};
