import "zod-openapi/extend";
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import reagentSchema from "shared/generated/zod/modelSchema/ReagentSchema";
import {
    CategorySchema,
    ContainerSchema,
    CurrencySchema,
    ReagentStatusSchema,
    ReagentTypeSchema,
    UnitSchema,
} from "shared/generated/zod";
import { ReagentSearchSchema } from "shared/zodSchemas/reagent/reagentSearchSchema";

export const ReagentCreationSchema = z.object({
    name: z.string(),
    structure: z.string().optional().nullable(),
    description: z.string(),
    quantity: z.number(),
    unit: z.lazy(() => UnitSchema).optional(),
    quantityInit: z.number().optional().nullable(),
    container: z
        .lazy(() => ContainerSchema)
        .optional()
        .nullable(),
    expirationDate: z.coerce.date().optional().nullable(),
    storageLocation: z.string().optional().nullable(),
    cas: z.string().optional().nullable(),
    producer: z.string().optional().nullable(),
    catalogId: z.string().optional().nullable(),
    catalogLink: z.string().optional().nullable(),
    pricePerUnit: z.number().optional().nullable(),
    currency: z.lazy(() => CurrencySchema).optional(),
    category: z.lazy(() => CategorySchema).optional(),
    type: z
        .lazy(() => ReagentTypeSchema)
        .optional()
        .nullable(),
    status: z
        .lazy(() => ReagentStatusSchema)
        .optional()
        .nullable(),
    storageId: z.string().uuid().optional().nullable(),
});
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

const badRequestResponse = {
    description: "Error - Bad Request.",
    content: {
        "application/json": {
            schema: z.object({
                statusCode: z.number().default(400),
                code: z.string().default("FST_ERR_VALIDATION"),
                error: z.string().default("Bad Request"),
                message: z.string().default("body/expirationDate Invalid date"),
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

export const POST_REAGENTS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Creates new reagent in the system",
    description: "Create new reagent.",
    tags: ["Reagents"],
    body: ReagentCreationSchema,
    response: {
        200: {
            description: "Created reagent data.",
            content: {
                "application/json": {
                    schema: z
                        .object({
                            id: z.string().uuid(),
                        })
                        .merge(ReagentCreationSchema),
                },
            },
        },
        400: badRequestResponse,
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
