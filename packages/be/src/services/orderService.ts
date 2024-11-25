import { Prisma, PrismaClient, Order, OrderStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { OrderReagentsSchema } from "../../../shared/zodSchemas/order/orderReagentSchema";
import { OrderSearch } from "../../../shared/zodSchemas/order/orderSearchSchema";
import {
    OrderCreateWithUserIdInputSchema,
    OrderUpdateWithUserIdInputSchema,
} from "../../../shared/zodSchemas/order/extendedOrderSchemas";

const prisma = new PrismaClient();

type OrderSearchResults = {
    data: Order[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

export class OrderService {
    /**
     * Retrieve all orders with optional filtering, pagination, and sorting.
     *
     * @param {OrderSearch} queryString - The search parameters including optional filters for pagination and sorting.
     * @returns {Promise<OrderSearchResults>} A promise that resolves to an object containing orders and metadata about the results.
     */
    async getAllOrders(queryString: OrderSearch): Promise<OrderSearchResults> {
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
            return { message: "Order can only be deleted if it is in 'pending' status." };
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

    /**
     * Update the status of an order.
     *
     * @param {string} id - The ID of the order to update.
     * @param {string} status - The new status for the order.
     * @returns {Promise<Order>} A promise that resolves to the updated order object.
     */
    async updateOrderStatus(id: string, status: OrderStatus): Promise<Order | { message: string }> {
        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        // If no order exists, return an error
        if (!existingOrder) {
            return { message: "Order not found." };
        }

        // Check if reagents are already moved in DB
        if (status === OrderStatus.fulfilled) {
            console.log("fulfilled order");
            // Check if reagents is an array
            const reagents = existingOrder.reagents as { id: string }[] | undefined;

            if (!reagents || reagents.length === 0) {
                return { message: "No reagents associated with this order." };
            }

            // Check if all reagents are moved to the reagents table
            const reagentsExist = await prisma.reagent.findMany({
                where: { id: { in: reagents.map((reagent) => reagent.id) } },
            });

            if (reagentsExist.length !== reagents.length) {
                return {
                    message:
                        "Not all reagents have been created. Please create reagents before fulfilling the order.",
                };
            }
        }

        // Update and return the order with the new status
        return prisma.order.update({
            where: { id },
            data: { status },
        });
    }
}
