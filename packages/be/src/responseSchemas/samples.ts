import { z } from "zod";
import "zod-openapi/extend";
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import sampleSchema, { SampleSchema } from "../../../shared/generated/zod/modelSchema/SampleSchema";
import { SampleSearchSchema } from "../../../shared/zodSchemas/samples/sampleSearchSchema";
import {
    SampleCreateSchema,
    SampleUpdateSchema,
} from "../../../shared/zodSchemas/samples/extendedSampleSchemas";

export const SamplesListSchema = z.object({
    data: z.array(sampleSchema),
    meta: z.object({
        currentPage: z.number().default(1),
        totalPages: z.number().default(4),
        totalCount: z.number().default(2),
        hasNextPage: z.boolean().default(true),
        hasPreviousPage: z.boolean().default(false),
    }),
});

const sampleIdParam = z.object({
    id: z.string().describe("Sample UUID."),
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

const internalErrorResponse = {
    description: "Server Error - Could not create sample.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Internal Server Error"),
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
    description: "The requested sample was not found.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Sample not found"),
            }),
        },
    },
};

export const POST_SAMPLES_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Creates new sample in the system",
    description: "Create new sample.",
    tags: ["Samples"],
    body: SampleCreateSchema,
    response: {
        200: {
            description: "Created sample data.",
            content: {
                "application/json": {
                    schema: SampleCreateSchema,
                },
            },
        },
        400: badRequestResponse,
        500: internalErrorResponse,
    },
};

export const GET_SAMPLES_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a list of samples with metadata for available pages",
    description: "Retrieve a list of available samples.",
    tags: ["Samples"],
    querystring: SampleSearchSchema,
    response: {
        200: {
            description: "Samples list with metadata.",
            content: {
                "application/json": {
                    schema: SamplesListSchema,
                },
            },
        },
    },
};

export const GET_SAMPLE_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a specific sample by id",
    description: "Retrieve sample data by id.",
    tags: ["Samples"],
    params: sampleIdParam,
    response: {
        200: {
            description: "The requested sample.",
            content: {
                "application/json": {
                    schema: sampleSchema,
                },
            },
        },
        400: validationErrorResponse,
        404: notFoundErrorResponse,
    },
};

export const PUT_SAMPLE_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Updates an existing sample by id",
    description: "Update sample information by id.",
    params: sampleIdParam,
    tags: ["Samples"],
    body: SampleUpdateSchema,
    response: {
        200: {
            description: "Updated sample data.",
            content: {
                "application/json": {
                    schema: SampleSchema,
                },
            },
        },
        400: validationErrorResponse,
        404: notFoundErrorResponse,
    },
};

export const DELETE_SAMPLE_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Soft deletes sample by id",
    description: "Soft delete sample by id.",
    tags: ["Samples"],
    params: sampleIdParam,
    response: {
        200: {
            description: "Sample data with updated 'deletedAt' field.",
            content: {
                "application/json": {
                    schema: sampleSchema,
                },
            },
        },
        400: validationErrorResponse,
        404: notFoundErrorResponse,
    },
};

export const PATCH_SAMPLE_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Reverts the soft delete of a sample by id",
    description: "Revert soft delete sample by id.",
    tags: ["Samples"],
    params: sampleIdParam,
    response: {
        200: {
            description: "Sample data with nullified 'deletedAt' field.",
            content: {
                "application/json": {
                    schema: sampleSchema,
                },
            },
        },
        400: validationErrorResponse,
        404: notFoundErrorResponse,
    },
};
