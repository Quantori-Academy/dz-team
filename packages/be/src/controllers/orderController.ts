// External dependencies
import { FastifyRequest, FastifyReply } from "fastify";
import { OrderStatus } from "@prisma/client";

// Internal services
import { orderService } from "../services/orderService";
import { sendErrorResponse } from "../utils/handleErrors";

// Shared schemas
import { idSchema } from "../../../shared/zodSchemas/baseSchemas";
import { OrderSearchSchema } from "../../../shared/zodSchemas/order/orderSearchSchema";
import {
    OrderUpdateWithUserIdInputSchema,
    RequestOrderCreateWithUserIdInputSchema,
} from "../../../shared/zodSchemas/order/extendedOrderSchemas";
import { fulfillOrderSchema } from "../../../shared/zodSchemas/order/fulfillOrderSchema";

class OrderController {
    /**
     * Get all orders.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of order.
     */
    async getAllOrders(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const validatedData = OrderSearchSchema.parse(request.query);
            const orders = await orderService.getAllOrders(validatedData);
            reply.send(orders);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get orders");
        }
    }

    /**
     * Get a specific order by ID.
     * @param request - FastifyRequest containing the order ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the order object or a 404 response if not found.
     */
    async getOrder(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const order = await orderService.getOrder(validatedId);
            if (!order) {
                return reply.status(404).send({ message: "Order not found" });
            }
            reply.send(order);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get order");
        }
    }

    /**
     * Create a new order.
     * @param request - FastifyRequest containing the order data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the created Order object.
     */
    async createOrder(
        request: FastifyRequest<{ Body: typeof RequestOrderCreateWithUserIdInputSchema }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            // Validate the input data
            const validatedData = RequestOrderCreateWithUserIdInputSchema.parse(request.body);

            // Call the service to create the order
            const order = await orderService.createOrder(validatedData);

            // Respond with the created order
            reply.send(order);
        } catch (error) {
            // Send an error response if anything goes wrong
            sendErrorResponse(reply, error, "Failed to create order");
        }
    }

    /**
     * Update an existing order.
     * @param request - FastifyRequest containing the order ID in the parameters and update data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the updated order object.
     */
    async updateOrder(
        request: FastifyRequest<{
            Params: { id: string };
            Body: typeof OrderUpdateWithUserIdInputSchema;
        }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const validatedData = OrderUpdateWithUserIdInputSchema.parse(request.body);
            const order = await orderService.updateOrder(validatedId, validatedData);
            reply.send(order);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update order");
        }
    }

    /**
     * Fulfill an order with reagents and requests data.
     * @param request - FastifyRequest containing the order ID in the parameters and the reagents and requests in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the fulfilled order object or an error message.
     */
    async fulfillOrder(
        request: FastifyRequest<{ Params: { id: string }; Body: typeof fulfillOrderSchema }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const validatedData = fulfillOrderSchema.parse(request.body);
            const { reagents } = validatedData;

            const result = await orderService.fulfillOrder(validatedId, { reagents });

            if ("message" in result) {
                return reply.status(400).send(result);
            }

            reply.send(result);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to fulfill order");
        }
    }

    /**
     * Update the status of an order.
     * @param request - FastifyRequest containing the order ID in the parameters and the new status in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the updated order object.
     */
    async updateOrderStatus(
        request: FastifyRequest<{ Params: { id: string }; Body: { status: OrderStatus } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const { status } = request.body;

            // Check if the status is valid according to the OrderStatus enum
            if (!Object.values(OrderStatus).includes(status)) {
                return reply.status(400).send({ error: "Invalid order status" });
            }

            const updatedOrder = await orderService.updateOrderStatus(validatedId, status);
            reply.send(updatedOrder);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update order status");
        }
    }
}

export const orderController = new OrderController();
