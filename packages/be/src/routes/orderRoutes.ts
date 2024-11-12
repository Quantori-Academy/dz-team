import { OrderCreateInputSchema, OrderUpdateInputSchema } from "../../../shared/generated/zod";
import { FastifyZodInstance } from "../types";
import { OrderController } from "../controllers/orderController";

import { OrderStatus } from "@prisma/client";
import { OrderSearchSchema } from "../../../shared/zodSchemas/order/orderSearchSchema";

const orderController = new OrderController();

/**
 * Registers the reagent routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const orderRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / - Retrieves all orders.
     * Requires authentication.
     *
     * @query {typeof OrderSearchSchema} Querystring - Search filters for orders.
     * @returns {Promise<void>} A list of orders.
     */
    app.get<{ Querystring: typeof OrderSearchSchema }>(
        "/",
        {
            schema: {
                tags: ["Order"],
            },
        },
        async (request, reply) => {
            return await orderController.getAllOrders(request, reply);
        },
    );

    /**
     * GET /:id - Retrieves a single order by its ID.
     * Requires authentication.
     *
     * @param {string} id - The ID of the order to retrieve.
     * @returns {Promise<void>} The requested order.
     */
    app.get<{ Params: { id: string } }>(
        "/:id",
        {
            schema: { tags: ["Order"] },
        },
        async (request, reply) => {
            return await orderController.getOrder(request, reply);
        },
    );

    /**
     * @route POST /
     * @tags Order
     * @summary Create a new order.
     * @param {OrderCreateInputSchema} request.body.required - Order data to create
     * @returns {Reagent} 201 - The created Order
     * @returns {Error} 400 - Validation error
     */
    app.post<{ Body: typeof OrderCreateInputSchema }>(
        "/",
        { schema: { tags: ["Order"], body: OrderCreateInputSchema } },
        async (request, reply) => {
            return await orderController.createOrder(request, reply);
        },
    );

    /**
     * PUT /:id - Updates an existing order by its ID.
     * Requires ADMIN role.
     *
     * @param {string} id - The ID of the order to update.
     * @body {typeof OrderUpdateInputSchema} Body - The updated data for the  order.
     * @returns {Promise<void>} The updated order.
     */
    app.put<{ Params: { id: string }; Body: typeof OrderUpdateInputSchema }>(
        "/:id",
        {
            schema: { tags: ["Order"], body: OrderUpdateInputSchema },
        },
        async (request, reply) => {
            return await orderController.updateOrder(request, reply);
        },
    );

    /**
     * PATCH /:id/status - Updates the status of an order by its ID.
     * Requires ADMIN role.
     *
     * @param {string} id - The ID of the order to update.
     * @body {typeof OrderStatusSchema} Body - The new status for the order.
     * @returns {Promise<void>} The updated order with the new status.
     */
    app.patch<{ Params: { id: string }; Body: { status: OrderStatus } }>(
        "/:id/status",
        {
            schema: { tags: ["Order"] },
        },
        async (request, reply) => {
            return await orderController.updateOrderStatus(request, reply);
        },
    );
};
