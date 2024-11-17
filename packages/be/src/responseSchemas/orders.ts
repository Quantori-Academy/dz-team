import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { OrderSearchSchema } from "shared/zodSchemas/order/orderSearchSchema";
import { z } from "zod";
import { OrderStatusSchema, ReagentSchema } from "shared/generated/zod";

export const orderIdParam = z.object({
    id: z.string().describe("Order UUID."),
});

export const badRequestResponse = {
    description: "Error - Bad Request",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Invalid UUID"),
            }),
        },
    },
};

export const notFoundResponse = {
    description: "Error - Order not found",
    content: {
        "application/json": {
            schema: z.object({
                message: z.string().default("Order not found"),
            }),
        },
    },
};

export const OrderSchema = z.object({
    status: OrderStatusSchema,
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullish(),
    seller: z.string(),
    deletedAt: z.coerce.date().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    userId: z.string().uuid(),
    reagents: z.array(ReagentSchema),
});

export const OrdersListSchema = z.object({
    data: z.array(OrderSchema),
    meta: z.object({
        currentPage: z.number().default(1),
        totalPages: z.number().default(4),
        totalCount: z.number().default(2),
        hasNextPage: z.boolean().default(true),
        hasPreviousPage: z.boolean().default(false),
    }),
});

export const GET_ORDERS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves all orders with metadata for available pages",
    description: "Retrieve all available orders.",
    querystring: OrderSearchSchema,
    tags: ["Orders"],
    response: {
        200: {
            description: "Orders list with metadata.",
            content: {
                "application/json": {
                    schema: OrdersListSchema,
                },
            },
        },
    },
};

export const GET_ORDER_BY_ID_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a single order by its id",
    description: "Retrieve single order by id.",
    params: orderIdParam,
    tags: ["Orders"],
    response: {
        200: {
            description: "Order details.",
            content: {
                "application/json": {
                    schema: OrderSchema,
                },
            },
        },
        400: badRequestResponse,
        404: notFoundResponse,
    },
};
