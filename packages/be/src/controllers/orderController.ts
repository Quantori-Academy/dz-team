import { FastifyRequest, FastifyReply } from "fastify";
import { idSchema } from "../../../shared/zodSchemas/baseSchemas";
import { OrderSearchSchema } from "../../../shared/zodSchemas/order/orderSearchSchema";
import { OrderService } from "../services/orderService";
import { sendErrorResponse } from "../utils/handleErrors";
import {
    OrderCreateWithUserIdInputSchema,
    OrderUpdateWithUserIdInputSchema,
} from "../../../shared/zodSchemas/order/extendedOrderSchemas";
import { OrderStatus } from "@prisma/client";
import { SellerService } from "../services/sellerService";

const sellerService = new SellerService();
const orderService = new OrderService();

export class OrderController {
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
        request: FastifyRequest<{ Body: typeof OrderCreateWithUserIdInputSchema }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            // Validate the input data
            const validatedData = OrderCreateWithUserIdInputSchema.parse(request.body);

            if (validatedData.seller) {
                // Check if the seller already exists
                const existingSeller = await sellerService.findSellerByName(validatedData.seller);

                if (!existingSeller) {
                    await sellerService.createSeller({ name: validatedData.seller });
                }
            }

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
            // Normalize seller to always be a string or undefined
            const sellerName =
                typeof validatedData.seller === "string"
                    ? validatedData.seller
                    : validatedData.seller?.set;

            if (sellerName) {
                const existingSeller = await sellerService.findSellerByName(sellerName);
                if (!existingSeller) {
                    await sellerService.createSeller({ name: sellerName });
                }
            }
            const order = await orderService.updateOrder(validatedId, validatedData);
            reply.send(order);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update order");
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
                return reply.status(400).send({ message: "Invalid order status" });
            }

            const updatedOrder = await orderService.updateOrderStatus(validatedId, status);
            reply.send(updatedOrder);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update order status");
        }
    }
}
