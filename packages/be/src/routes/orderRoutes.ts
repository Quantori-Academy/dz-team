import { FastifyZodInstance } from "../types";
import { OrderController } from "../controllers/orderController";

import { OrderStatus } from "@prisma/client";
import { OrderSearchSchema } from "../../../shared/zodSchemas/order/orderSearchSchema";
import {
    OrderCreateWithUserIdInputSchema,
    OrderUpdateWithUserIdInputSchema,
} from "../../../shared/zodSchemas/order/extendedOrderSchemas";
import { fulfillOrderSchema } from "shared/zodSchemas/order/fulfillOrderSchema";

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
    app.post<{ Body: typeof OrderCreateWithUserIdInputSchema }>(
        "/",
        { schema: { tags: ["Order"], body: OrderCreateWithUserIdInputSchema } },
        async (request, reply) => {
            return await orderController.createOrder(request, reply);
        },
    );

    /**
     * PUT /:id - Updates an existing order by its ID.
     * Requires ADMIN role.
     *
     * @param {string} id - The ID of the order to update.
     * @body {typeof OrderUpdateWithUserIdInputSchema} Body - The updated data for the  order.
     * @returns {Promise<void>} The updated order.
     */
    app.put<{ Params: { id: string }; Body: typeof OrderUpdateWithUserIdInputSchema }>(
        "/:id",
        {
            schema: { tags: ["Order"], body: OrderUpdateWithUserIdInputSchema },
        },
        async (request, reply) => {
            return await orderController.updateOrder(request, reply);
        },
    );

    /**
     * PATCH /:id/fulfill - Fulfill an order with partial data (reagents and requests).
     * Requires ADMIN role.
     *
     * @param {string} id - The ID of the order to fulfill.
     * @body {typeof fulfillOrderWithPartialDataSchema} Body - The reagents and requests data.
     * @returns {Promise<void>} The updated order or an error message.
     */
    app.patch<{ Params: { id: string }; Body: typeof fulfillOrderSchema }>(
        "/:id/fulfill",
        {
            schema: {
                tags: ["Order"],
            },
        },
        async (request, reply) => {
            return await orderController.fulfillOrder(request, reply);
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
