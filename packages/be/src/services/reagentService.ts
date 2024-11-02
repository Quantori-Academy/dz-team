import { Prisma, PrismaClient } from "@prisma/client";
import {
    ReagentCreateInputSchema,
    ReagentUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { Reagent } from "../../../shared/generated/zod/modelSchema";
import { ReagentSearch } from "../../../shared/zodSchemas";

const prisma = new PrismaClient();

type SearchResults = {
    data: Reagent[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

export class ReagentService {
    /**
     * Get all reagents that are not deleted.
     * @returns {Promise<Reagent[]>} An array of all non-deleted reagents.
     */
    async getAllReagents(queryString: ReagentSearch): Promise<SearchResults> {
        const { query, page, limit, sortBy, sortOrder, searchBy, category, status } = queryString;

        // conditionally construct search conditions
        const searchConditions = query
            ? searchBy?.map((field) => {
                  return { [field]: { contains: query, mode: Prisma.QueryMode.insensitive } };
              })
            : null;

        // combine filter and search conditions for a query
        // <category> AND <status> AND <storageLocation> AND <query>[<name> OR <structure> OR ...]
        const where: Prisma.ReagentWhereInput = {
            // FILTER CONDITIONS
            AND: [
                category ? { category } : {},
                status ? { status } : {},
                // SEARCH CONDITIONS
                // include OR condition only if there are search conditions
                searchConditions && searchConditions.length > 0 ? { OR: searchConditions } : {},
            ].filter(Boolean), // remove all {} conditions from AND condition
            deletedAt: null, // exclude soft-deleted records
        };

        const [reagents, totalCount] = await Promise.all([
            prisma.reagent.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            prisma.reagent.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        const result = {
            data: reagents,
            meta: {
                currentPage: page,
                totalPages,
                totalCount,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };

        return result;
    }

    /**
     * Get a specific reagent by its ID.
     * @param {string} id - The UUID of the reagent to retrieve.
     * @returns {Promise<Reagent | null>} The reagent or null if not found.
     */
    async getReagent(id: string): Promise<Reagent | null> {
        return await prisma.reagent.findUnique({ where: { id, deletedAt: null } });
    }

    /**
     * Create a new reagent.
     * @param {Prisma.ReagentCreateInput} newReagentData - The data to create a new reagent.
     * @returns {Promise<Reagent>} The newly created reagent.
     */
    async createReagent(newReagentData: Prisma.ReagentCreateInput): Promise<Reagent> {
        const validatedData = ReagentCreateInputSchema.parse(newReagentData);

        return await prisma.reagent.create({ data: validatedData });
    }

    /**
     * Update an existing reagent by its ID.
     * @param {string} id - The UUID of the reagent to update.
     * @param {Prisma.ReagentUpdateInput} updateReagentData - The data to update the reagent.
     * @returns {Promise<Reagent>} The updated reagent.
     */
    async updateReagent(
        id: string,
        updateReagentData: Prisma.ReagentUpdateInput,
    ): Promise<Reagent> {
        const validatedData = ReagentUpdateInputSchema.parse(updateReagentData);

        return await prisma.reagent.update({
            where: { id, deletedAt: null },
            data: validatedData,
        });
    }

    /**
     * Soft delete a reagent by setting its deletedAt field to the current date.
     * @param {string} id - The UUID of the reagent to delete.
     * @returns {Promise<Reagent>} The soft-deleted reagent.
     */
    async deleteReagent(id: string): Promise<Reagent> {
        return await prisma.reagent.update({ where: { id }, data: { deletedAt: new Date() } });
    }

    /**
     * Undo the soft delete of a reagent by setting its deletedAt field to null.
     * @param {string} id - The UUID of the reagent to restore.
     * @returns {Promise<Reagent>} The restored reagent.
     */
    async undoDeleteReagent(id: string): Promise<Reagent> {
        return await prisma.reagent.update({ where: { id }, data: { deletedAt: null } });
    }
}
