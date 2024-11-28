import { Prisma, PrismaClient, Seller } from "@prisma/client";
import {
    SellerCreateInputSchema,
    SellerUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { SellerSearch } from "../../../shared/zodSchemas/seller/sellerSearchSchema";

const prisma = new PrismaClient();

type SearchResults = {
    data: Seller[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

export class SellerService {
    /**
     * Retrieve all sellers with optional filtering, pagination, and sorting.
     *
     * @param {SellerSearch} queryString - The search parameters including filters for pagination and sorting.
     * @returns {Promise<SearchResults>} A promise that resolves to an object containing sellers and metadata about the results.
     */
    async getAllSellers(queryString: SellerSearch): Promise<SearchResults> {
        const { name, page, limit, sortBy, sortOrder } = queryString;

        // Conditions for search across name if query is provided
        const searchConditions = name
            ? [{ name: { contains: name, mode: Prisma.QueryMode.insensitive } }]
            : [];

        // Build the where clause dynamically based on searchConditions
        const where: Prisma.SellerWhereInput = {
            AND: [searchConditions.length > 0 ? { OR: searchConditions } : {}].filter(Boolean), // Filter out empty conditions
        };

        // Fetch paginated results and total count in parallel
        const [sellers, totalCount] = await Promise.all([
            prisma.seller.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            prisma.seller.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            data: sellers,
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
     * Find a seller by their unique name.
     *
     * @param {string} name - The name of the seller to search for.
     * @returns {Promise<Seller | null>} A promise that resolves to the seller if found, or null otherwise.
     */
    async findSellerByName(name: string): Promise<Seller | null> {
        return prisma.seller.findUnique({
            where: { name },
        });
    }

    /**
     * Create a new seller with the specified name if it doesn't already exist.
     *
     * @param {Prisma.SellerCreateInput} newSellerData - The data for the new seller.
     * @returns {Promise<Seller>} A promise that resolves to the created seller object.
     */
    async createSeller(newSellerData: Prisma.SellerCreateInput): Promise<Seller> {
        const validatedData = SellerCreateInputSchema.parse(newSellerData);
        return prisma.seller.create({ data: validatedData });
    }

    /**
     * Update a seller's name, checking for uniqueness. If the new name exists, returns the existing seller's ID instead.
     *
     * @param {string} id - The ID of the seller to update.
     * @param {Prisma.SellerUpdateInput} updateSellerData - The data to update the seller.
     * @returns {Promise<Seller | { id: string }>} A promise that resolves to the updated seller or the existing seller ID if the name is taken.
     */
    async updateSeller(
        id: string,
        updateSellerData: Prisma.SellerUpdateInput,
    ): Promise<Seller | { id: string }> {
        const validatedData = SellerUpdateInputSchema.parse(updateSellerData);

        // If the name is unique or updating the same seller, proceed with update
        return prisma.seller.update({
            where: { id },
            data: validatedData,
        });
    }

    /**
     * Delete a seller by ID.
     *
     * @param {string} id - The ID of the seller to delete.
     * @returns {Promise<Seller | null>} A promise that resolves to the deleted seller, or null if the seller was not found.
     */
    async deleteSeller(id: string): Promise<Seller | null> {
        return prisma.seller.delete({
            where: { id },
        });
    }
}
