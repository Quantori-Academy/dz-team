import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import { RequestSearchSchema } from "shared/zodSchemas/request/requestSchemas";

export const requestIdParam = z.object({
    requestId: z.string().uuid(),
});

export const RequestSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    structure: z.string().nullable().optional(),
    cas: z.string().nullable().optional(),
    quantity: z.number().positive("Quantity must be positive"),
    unit: z.string(), // unit as string
    status: z.enum(["pending", "ordered", "declined", "fulfilled"]),
    commentsUser: z.array(z.string()).optional(),
    commentsProcurement: z.array(z.string()).optional(),
    deletedAt: z.coerce.date().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    userId: z.string().uuid(),
    orderId: z.string().uuid().nullable().optional(),
});

export const RequestsListSchema = z.object({
    data: z.array(RequestSchema),
    meta: z.object({
        currentPage: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean(),
        hasPreviousPage: z.boolean(),
    }),
});

export const GET_REQUESTS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves all requests with metadata for available pages",
    description: "Retrieve all available requests.",
    querystring: RequestSearchSchema,
    tags: ["Requests"],
    response: {
        200: {
            description: "Requests list with metadata.",
            content: {
                "application/json": {
                    schema: RequestsListSchema,
                },
            },
        },
    },
};

export const GET_REQUEST_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieve a request by ID",
    description: "Fetch details for a specific request.",
    tags: ["Requests"],
    params: z.object({
        requestId: z.string().uuid().describe("Request UUID"),
    }),
    response: {
        200: {
            description: "Successful response",
            content: {
                "application/json": {
                    schema: RequestSchema,
                },
            },
        },
        404: {
            description: "Request not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Request not found"),
                    }),
                },
            },
        },
    },
};

export const POST_REQUEST_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Creates new request",
    description: "Create new request.",
    tags: ["Requests"],
};

export const PATCH_REQUEST_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Updates a specific request",
    description: "Update request by id.",
    tags: ["Requests"],
    params: z.object({
        requestId: z.string().uuid().describe("Request UUID"),
    }),
    response: {
        200: {
            description: "Successful response",
            content: {
                "application/json": {
                    schema: RequestSchema,
                },
            },
        },
        404: {
            description: "Request not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Request not found"),
                    }),
                },
            },
        },
    },
};
