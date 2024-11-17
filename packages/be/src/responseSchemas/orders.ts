import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { OrderSearchSchema } from "shared/zodSchemas/order/orderSearchSchema";
import { z } from "zod";
import { OrderStatusSchema, ReagentSchema } from "shared/generated/zod";

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
    description: "Retrieve all available orders",
    querystring: OrderSearchSchema,
    tags: ["Order"],
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
