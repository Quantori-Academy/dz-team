import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import storageLocationSchema from "shared/generated/zod/modelSchema/StorageLocationSchema";
import { StorageLocationSearchSchema } from "shared/zodSchemas/storageLocation/storageLocationSearchSchema";

export const storageLocationIdParam = z.object({
    id: z.string().describe("Storage location UUID."),
});

export const storageLocationsListSchema = z.object({
    data: z.array(storageLocationSchema),
    meta: z.object({
        currentPage: z.number().default(1),
        totalPages: z.number().default(4),
        totalCount: z.number().default(2),
        hasNextPage: z.boolean().default(true),
        hasPreviousPage: z.boolean().default(false),
    }),
});

const badRequestResponse = {
    description: "Error - Bad Request",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Validation error"),
                errors: z.array(
                    z.object({
                        validation: z.string().default("uuid"),
                        code: z.string().default("invalid_string"),
                        message: z.string().default("Invalid uuid"),
                        path: z.array(z.string()),
                    }),
                ),
            }),
        },
    },
};
const notFoundResponse = {
    description: "Error - Not Found.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Storage location not found"),
            }),
        },
    },
};

const unauthorizedResponse = {
    description: "Error - Unauthorized.",
    content: {
        "application/json": {
            schema: z.object({
                statusCode: z.number().default(401),
                code: z.string().default("FST_JWT_NO_AUTHORIZATION_IN_HEADER"),
                error: z.string().default("Unauthorized"),
                message: z.string().default("No Authorization was found in request.headers"),
            }),
        },
    },
};

export const GET_STORAGE_LOCATIONS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves available storage locations with metadata for available pages",
    description: "Retrieve available storage locations.",
    tags: ["Storage Locations"],
    querystring: StorageLocationSearchSchema,
    response: {
        200: {
            description: "Locations list.",
            content: {
                "application/json": {
                    schema: storageLocationsListSchema,
                },
            },
        },
        401: unauthorizedResponse,
    },
};

export const GET_STORAGE_LOCATION_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves specific storage location by id",
    description: "Retrieve a specific storage location by id.",
    tags: ["Storage Locations"],
    params: storageLocationIdParam,
    response: {
        200: {
            description: "Storage location data.",
            content: {
                "application/json": {
                    schema: storageLocationSchema,
                },
            },
        },
        400: badRequestResponse,
        404: notFoundResponse,
        401: unauthorizedResponse,
    },
};

export const DELETE_STORAGE_LOCATION_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Soft deletes storage location by id",
    description: "Soft delete of storage location by id.",
    tags: ["Storage Locations"],
    params: storageLocationIdParam,
    response: {
        200: {
            description: "Storage location data with updated or same 'deletedAt' field.",
            content: {
                "application/json": {
                    schema: storageLocationSchema,
                },
            },
        },
        400: badRequestResponse,
        404: notFoundResponse,
    },
};

export const PATCH_STORAGE_LOCATION_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Reverts the soft delete of a storage location by ID",
    description: "Revert soft delete of storage location by id.",
    tags: ["Storage Locations"],
    params: storageLocationIdParam,
    response: {
        200: {
            description: "Storage location data with nullified 'deletedAt' field.",
            content: {
                "application/json": {
                    schema: storageLocationSchema,
                },
            },
        },
        400: badRequestResponse,
        404: notFoundResponse,
    },
};

//98b44bb2-167a-449e-9892-0c998b4b9730
