// External dependencies
import { Prisma, Order, OrderStatus, Unit } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Internal utilities
import { prisma } from "../utils/prisma";
import { SearchResults } from "../types";

// Shared schemas
import { OrderReagentsSchema } from "../../../shared/zodSchemas/order/orderReagentSchema";
import { OrderSearch } from "../../../shared/zodSchemas/order/orderSearchSchema";
import {
    OrderCreateWithUserIdInputSchema,
    OrderUpdateWithUserIdInputSchema,
} from "../../../shared/zodSchemas/order/extendedOrderSchemas";
import { fulfillOrderSchema } from "../../../shared/zodSchemas/order/fulfillOrderSchema";

class OrderService {
    /**
     * Retrieve all orders with optional filtering, pagination, and sorting.
     *
     * @param {OrderSearch} queryString - The search parameters including optional filters for pagination and sorting.
     * @returns {Promise<OrderSearchResults>} A promise that resolves to an object containing orders and metadata about the results.
     */
    async getAllOrders(queryString: OrderSearch): Promise<SearchResults<Order>> {
        const { query, page, limit, sortBy, sortOrder, status } = queryString;

        // Define search conditions based on query
        const searchConditions = query
            ? [
                  { seller: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { description: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { title: { contains: query, mode: Prisma.QueryMode.insensitive } },
              ]
            : [];

        // Build the `where` clause with optional filters
        const where: Prisma.OrderWhereInput = {
            AND: [
                status ? { status: { equals: status } } : {},
                searchConditions.length > 0 ? { OR: searchConditions } : {},
            ].filter(Boolean), // Remove empty objects
        };

        // Fetch paginated results and total count in parallel
        const [orders, totalCount] = await Promise.all([
            prisma.order.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    requests: true,
                },
            }),
            prisma.order.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            data: orders,
            meta: {
                currentPage: page,
                totalPages,
                totalCount,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    /**
     * Retrieve a specific order by ID, including its connected reagents.
     *
     * @param {string} id - The ID of the order to retrieve.
     * @returns {Promise<Order | null>} A promise that returns order.
     */
    async getOrder(id: string): Promise<Order | null> {
        return prisma.order.findUnique({
            where: { id, deletedAt: null },
        });
    }

    /**
     * Create a new order.
     *
     * @param {OrderCreateWithUserIdInputSchema} newOrderData - The data for the new order, including embedded reagent details.
     * @returns {Promise<Order>} A promise that resolves to the created order object.
     */
    async createOrder(newOrderData: unknown): Promise<Order> {
        // Validate the general order data (excluding reagents)
        const validatedData = OrderCreateWithUserIdInputSchema.parse(newOrderData);

        // Validate reagents array and add IDs if valid
        if (Array.isArray(validatedData.reagents)) {
            validatedData.reagents = validatedData.reagents.map(
                (reagent: z.infer<typeof OrderReagentsSchema>) => {
                    OrderReagentsSchema.parse(reagent); // Validate each reagent
                    return { id: uuidv4(), ...reagent }; // Add unique ID
                },
            );
        }

        // Create and return the new order
        return prisma.order.create({
            data: validatedData,
        });
    }

    /**
     * Update an existing order.
     *
     * @param {string} id - The ID of the order to update.
     * @param {Prisma.OrderUpdateInput} updateOrderData - The data to update the order.
     * @returns {Promise<Order | { message: string }>} A promise that resolves to the updated order object.
     */
    async updateOrder(id: string, updateOrderData: unknown): Promise<Order | { message: string }> {
        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        if (existingOrder?.status !== OrderStatus.pending) {
            return { message: "Order can only be edited if it is in 'pending' status." };
        }
        // Validate the general order data (excluding reagents)
        const validatedData = OrderUpdateWithUserIdInputSchema.parse(updateOrderData);

        if (Array.isArray(validatedData.reagents)) {
            validatedData.reagents = validatedData.reagents.map(
                (reagent: z.infer<typeof OrderReagentsSchema>) => {
                    OrderReagentsSchema.parse(reagent); // Validate each reagent
                    return { id: uuidv4(), ...reagent }; // Add unique ID
                },
            ) as Prisma.JsonValue[]; // Cast to Prisma.JsonValue[] for compatibility
        }

        // Update and return the updated order
        return prisma.order.update({
            where: { id },
            data: { ...validatedData, status: "pending" },
        });
    }

    async fulfillOrder(
        orderId: string,
        data: z.infer<typeof fulfillOrderSchema>,
    ): Promise<Order | { message: string }> {
        const { reagents } = data;

        // Fetch the order by ID
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                requests: true, // Include related requests
            },
        });

        if (!order) {
            return { message: "Order not found." };
        }

        // Validate the order status
        if (order.status !== "submitted") {
            return { message: "Only submitted orders can be fulfilled." };
        }

        // Ensure that order.reagents is an array and check if its length matches
        if (!Array.isArray(order.reagents) || order.reagents.length !== reagents.length) {
            return { message: "There are not enough storage locations for all reagents." };
        }

        // Parse the reagents array from the order
        const orderReagents = order.reagents as Array<{
            id?: string;
            name: string;
            structure?: string;
            cas?: string;
            producer: string;
            catalogId?: string;
            catalogLink?: string;
            unit: Unit;
            pricePerUnit: number;
            quantity: number;
        }>;

        // Process reagents from the order
        const processedReagents = reagents.map(({ id, storageId }) => {
            const reagent = orderReagents.find((r) => r.id === id);
            if (!reagent) {
                throw new Error(`Reagent with ID ${id} not found in the order.`);
            }

            return {
                name: reagent.name,
                structure: reagent.structure,
                cas: reagent.cas,
                producer: reagent.producer,
                catalogId: reagent.catalogId,
                catalogLink: reagent.catalogLink,
                unit: reagent.unit,
                pricePerUnit: reagent.pricePerUnit,
                quantity: reagent.quantity,
                storageId,
            };
        });

        // Insert combined data into the reagent table
        await prisma.reagent.createMany({
            data: processedReagents,
            skipDuplicates: true,
        });

        // If status change is to fulfilled, update the reagent requests to 'Fulfilled'
        await prisma.reagentRequest.updateMany({
            where: { orderId: orderId },
            data: { status: "fulfilled" },
        });

        // Update the order status fulfilled
        return prisma.order.update({
            where: { id: orderId },
            data: { status: "fulfilled" },
        });
    }

    /**
     * Update the status of an order.
     *
     * @param {string} id - The ID of the order to update.
     * @param {string} status - The new status for the order.
     * @returns {Promise<Order>} A promise that resolves to the updated order object.
     */
    async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            throw new Error("Order not found."); // 404 Not Found
        }

        if (!status) {
            throw new Error("Invalid status provided."); // 400 Bad Request
        }

        if (status === OrderStatus.fulfilled) {
            throw new Error("Cannot change status to 'fulfilled'."); // 400 Bad Request
        }

        // Validate transitions based on the existing order status
        if (existingOrder.status === OrderStatus.pending) {
            if (status !== OrderStatus.submitted && status !== OrderStatus.pending) {
                throw new Error("Only 'submitted' can be set from 'pending' status."); // 400 Bad Request
            }
        } else if (existingOrder.status === OrderStatus.submitted) {
            if (status !== OrderStatus.canceled) {
                throw new Error(
                    "Only 'fulfilled' or 'cancelled' can be set from 'submitted' status.",
                ); // 400 Bad Request
            }
        } else if (
            existingOrder.status === OrderStatus.canceled ||
            existingOrder.status === OrderStatus.fulfilled
        ) {
            throw new Error("Cannot change status once the order is 'cancelled' or 'fulfilled'."); // 400 Bad Request
        } else {
            throw new Error("Invalid status change."); // 400 Bad Request
        }

        // If status change is to 'canceled', update associated reagent requests to 'pending'
        if (status === OrderStatus.canceled) {
            await prisma.reagentRequest.updateMany({
                where: { orderId: id },
                data: { status: "pending" },
            });
        }

        // Update and return the order with the new status
        return prisma.order.update({
            where: { id },
            data: { status },
        });
    }

    /**
     * Delete a order by ID.
     *
     * @param {string} id - The ID of the order to delete.
     * @returns {Promise<Seller | null>} A promise that resolves to the deleted order, or null if the order was not found.
     */
    async deleteOrder(id: string): Promise<Order | { message: string }> {
        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            throw new Error("Order not found."); // 404 Not Found
        }

        if (existingOrder?.status !== OrderStatus.pending) {
            return { message: "Order can only be deleted if it is in 'pending' status." };
        }

        return prisma.order.delete({
            where: { id },
        });
    }
}

export const orderService = new OrderService();
