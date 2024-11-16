import "zod-openapi/extend";
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import { ReagentSearchSchema } from "shared/zodSchemas";
import reagentSchema from "shared/generated/zod/modelSchema/ReagentSchema";

export const ReagentsListSchema = z.object({
    data: z.array(reagentSchema),
    meta: z.object({
        currentPage: z.number().default(1),
        totalPages: z.number().default(4),
        totalCount: z.number().default(2),
        hasNextPage: z.boolean().default(true),
        hasPreviousPage: z.boolean().default(false),
    }),
});

const reagentIdParam = z.object({
    id: z.string().describe("Reagent's UUID."),
});

const validationErrorResponse = {
    description: "Validation Error - Invalid id.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Validation error"),
            }),
        },
    },
};
const notFoundErrorResponse = {
    description: "The requested reagent was not found.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Reagent not found"),
            }),
        },
    },
};

export const GET_REAGENTS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a list of reagents with metadata for available pages",
    description: "Retrieve a list of available reagents.",
    tags: ["Reagents"],
    querystring: ReagentSearchSchema,
    response: {
        200: {
            description: "Reagents list with metadata.",
            content: {
                "application/json": {
                    schema: ReagentsListSchema,
                },
            },
        },
    },
};

export const GET_REAGENT_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a specific reagent by ID",
    description: "Retrieve reagent data by id.",
    tags: ["Reagents"],
    params: reagentIdParam,
    response: {
        200: {
            description: "The requested reagent.",
            content: {
                "application/json": {
                    schema: reagentSchema,
                },
            },
        },
        400: validationErrorResponse,
        404: notFoundErrorResponse,
    },
};

export const DELETE_REAGENT_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Soft deletes reagent by id",
    description: "Soft delete reagent by id.",
    tags: ["Reagents"],
    params: reagentIdParam,
    response: {
        200: {
            description: "Reagent data with updated 'deletedAt' field.",
            content: {
                "application/json": {
                    schema: reagentSchema,
                },
            },
        },
        400: validationErrorResponse,
        404: notFoundErrorResponse,
    },
};

export const PATCH_REAGENT_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Reverts the soft delete of a reagent by ID",
    description: "Revert soft delete reagent by id.",
    tags: ["Reagents"],
    params: reagentIdParam,
    response: {
        200: {
            description: "Reagent data with nullified 'deletedAt' field.",
            content: {
                "application/json": {
                    schema: reagentSchema,
                },
            },
        },
        400: validationErrorResponse,
        404: notFoundErrorResponse,
    },
};
