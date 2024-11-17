import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import storageLocationSchema, {
    StorageLocationSchema,
} from "shared/generated/zod/modelSchema/StorageLocationSchema";
import { StorageLocationSearchSchema } from "shared/zodSchemas/storageLocation/storageLocationSearchSchema";
import { ReagentSchema } from "shared/generated/zod";

export const storageLocationIdParam = z.object({
    id: z.string().describe("Storage location UUID."),
});
export const reagentIdParam = z.object({
    reagentId: z.string().describe("Reagent UUID."),
});

export const StorageLocationCreation = z.object({
    room: z.string().describe("Storage Location room."),
    name: z.string().describe("Storage Location place name"),
});
export const StorageLocationsListSchema = z.object({
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

export const couldNotMoveResponse = {
    description: "Error - Couldn't move reagent",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Failed to move reagent"),
            }),
        },
    },
};

const invalidUUIDResponse = {
    description: "Error - Bad Request.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Invalid UUID"),
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

const fieldRequiredBadRequest = {
    description: "Error - Bad Request.",
    content: {
        "application/json": {
            schema: z.object({
                statusCode: z.number().default(400),
                code: z.string().default("FST_ERR_VALIDATION"),
                error: z.string().default("Bad Request"),
                message: z.string().default("body/name Required"),
            }),
        },
    },
};

export const POST_STORAGE_LOCATION_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Creates new storage location",
    description: "Create new storage location.",
    tags: ["Storage Locations"],
    body: StorageLocationCreation,
    response: {
        200: {
            description: "Created storage location.",
            content: {
                "application/json": {
                    schema: StorageLocationSchema,
                },
            },
        },
        400: fieldRequiredBadRequest,
        401: unauthorizedResponse,
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
                    schema: StorageLocationsListSchema,
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

export const PUT_MOVE_STORAGE_LOCATION_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Moves a reagent to a new storage location",
    description: "Move reagent to new storage location.",
    params: reagentIdParam,
    tags: ["Storage Locations"],
    body: z.object({
        newStorageLocationId: z.string().uuid(),
    }),
    response: {
        200: {
            description: "Updated reagent location information.",
            content: {
                "application/json": {
                    schema: ReagentSchema,
                },
            },
        },
        400: invalidUUIDResponse,
        401: unauthorizedResponse,
        404: notFoundResponse,
        500: couldNotMoveResponse,
    },
};
