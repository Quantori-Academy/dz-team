import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import { SellerSearchSchema } from "shared/zodSchemas/seller/sellerSearchSchema";

export const sellerIdParam = z.object({
    id: z.string().uuid().describe("Seller UUID."),
});

export const SellerCreationSchema = z.object({
    name: z.string().describe("Seller's name."),
});

export const SellerUpdateSchema = z.object({
    name: z.string().optional().describe("Updated seller's name."),
});

export const DeleteResponseSchema = z.object({
    message: z.string(), // A string containing the success message
});
const SellerSchema = z.object({
    id: z.string().uuid().describe("Seller UUID."),
    name: z.string().describe("Seller's name."),
});

const SellersListSchema = z.array(SellerSchema);

const badRequestResponse = {
    description: "Error - Bad Request.",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Validation error"),
                errors: z.array(
                    z.object({
                        validation: z.string().default("uuid"),
                        code: z.string().default("invalid_string"),
                        message: z.string().default("Invalid UUID"),
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
                message: z.string().default("Seller not found"),
            }),
        },
    },
};

export const POST_SELLER_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Creates a new seller",
    description: "Create a new seller.",
    tags: ["Sellers"],
    body: SellerCreationSchema,
    response: {
        200: {
            description: "Created seller.",
            content: {
                "application/json": {
                    schema: SellerSchema,
                },
            },
        },
        400: badRequestResponse,
    },
};

export const PUT_SELLER_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Updates an existing seller by its id",
    description: "Update seller by id.",
    tags: ["Sellers"],
    body: SellerUpdateSchema,
    params: sellerIdParam,
    response: {
        200: {
            description: "Updated seller data.",
            content: {
                "application/json": {
                    schema: SellerSchema,
                },
            },
        },
        400: badRequestResponse,
        404: notFoundResponse,
    },
};

export const GET_SELLERS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a list of sellers",
    description: "Retrieve all sellers.",
    querystring: SellerSearchSchema,
    tags: ["Sellers"],
    response: {
        200: {
            description: "List of sellers.",
            content: {
                "application/json": {
                    schema: SellersListSchema,
                },
            },
        },
    },
};

export const GET_SELLER_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a specific seller by id",
    description: "Retrieve a specific seller by id.",
    tags: ["Sellers"],
    params: sellerIdParam,
    response: {
        200: {
            description: "Seller data.",
            content: {
                "application/json": {
                    schema: SellerSchema,
                },
            },
        },
        400: badRequestResponse,
        404: notFoundResponse,
    },
};

export const DELETE_SELLER_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Deletes a seller by id",
    description: "Delete seller by id.",
    tags: ["Sellers"],
    params: sellerIdParam,
    response: {
        200: {
            description: "Deleted seller data.",
            content: {
                "application/json": {
                    schema: DeleteResponseSchema,
                },
            },
        },
        400: badRequestResponse,
        404: notFoundResponse,
    },
};
