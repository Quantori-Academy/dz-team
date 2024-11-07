import { Prisma, PrismaClient, Order, OrderStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import {
    OrderCreateInputSchema,
    OrderUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { OrderReagentsSchema, OrderSearch } from "../../../shared/zodSchemas";

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
            : null;

        // Build the `where` clause with optional filters for `status` and `orderId`
        const where: Prisma.OrderWhereInput = {
            AND: [
                status ? { status: { equals: status } } : {},
                searchConditions ? { OR: searchConditions } : {},
            ].filter(Boolean),
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
     * @param {Prisma.OrderCreateInput} newOrderData - The data for the new order, including embedded reagent details.
     * @returns {Promise<Order>} A promise that resolves to the created order object.
     */
    async createOrder(newOrderData: Prisma.OrderCreateInput): Promise<Order> {
        // Validate the general order data (excluding reagents)
        const validatedData = OrderCreateInputSchema.parse(newOrderData);

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
    async updateOrder(
        id: string,
        updateOrderData: Prisma.OrderUpdateInput,
    ): Promise<Order | { message: string }> {
        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        if (existingOrder?.status !== OrderStatus.pending) {
            return { message: "Order can only be deleted if it is in 'pending' status." };
        }
        // Validate the general order data (excluding reagents)
        const validatedData = OrderUpdateInputSchema.parse(updateOrderData);

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
            data: validatedData,
        });
    }

    /**
     * Soft delete an order by setting its deletedAt field to the current date, only if status is 'pending'.
     * @param {string} id - The ID of the order to delete.
     * @returns {Promise<Order | { message: string }>} The soft-deleted order or an error message if deletion is restricted.
     */
    async deleteOrder(id: string): Promise<Order | { message: string }> {
        // Check if the order status is 'pending' before allowing deletion
        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        if (existingOrder?.status !== OrderStatus.pending) {
            return { message: "Order can only be deleted if it is in 'pending' status." };
        }

        // Perform a soft delete by updating the `deletedAt` field
        return prisma.order.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

    /**
     * Undo the soft delete of an order by setting its deletedAt field to null.
     * @param {string} id - The ID of the order to restore.
     * @returns {Promise<Order>} The restored order.
     */
    async undoDeleteOrder(id: string): Promise<Order> {
        return prisma.order.update({
            where: { id },
            data: { deletedAt: null },
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
        return prisma.order.update({
            where: { id },
            data: { status },
        });
    }
}
