import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import { unauthorizedResponse } from "./storageLocations";

export const requestIdParam = z.object({
    requestId: z.string().uuid(),
});

export const RequestSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    structure: z.string().optional(),
    cas: z.string().optional(),
    quantity: z.number().positive("Quantity must be positive"),
    unit: z.enum(["ml", "l", "mg", "g", "oz", "lb"]),
    status: z.enum(["pending", "ordered", "declined", "fulfilled"]),
    commentsUser: z.array(z.string()).optional(),
    commentsProcurement: z.array(z.string()).optional(),
    deletedAt: z.coerce.date().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    userId: z.string().uuid(),
    orderId: z.string().uuid().optional(),
});

export const RequestsListSchema = z.object({
    data: z.array(RequestSchema),
    meta: z.object({
        currentPage: z.number().default(1),
        totalPages: z.number().default(4),
        totalCount: z.number().default(2),
        hasNextPage: z.boolean().default(true),
        hasPreviousPage: z.boolean().default(false),
    }),
});

export const GET_REQUESTS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves all requests with metadata for available pages",
    description: "Retrieve all available requests.",
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
    summary: "Retrieve a specific request by ID",
    description: "Fetch detailed information about a request by its unique ID",
    tags: ["Requests"],
    params: requestIdParam,
    response: {
        200: {
            description: "Request details",
            content: {
                "application/json": {
                    schema: RequestSchema,
                },
            },
        },
        400: {
            description: "Invalid UUID supplied",
        },
        404: {
            description: "Request not found",
        },
    },
};

export const PATCH_REQUEST_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Updates a specific request",
    description: "Update request by id.",
    params: requestIdParam,
    tags: ["Requests"],
    response: {
        200: {
            description: "Updated request details.",
            content: {
                "application/json": {
                    schema: RequestSchema,
                },
            },
        },
        400: {
            description: "Invalid request or input data",
        },
        404: {
            description: "Request not found",
        },
        401: unauthorizedResponse,
    },
};
