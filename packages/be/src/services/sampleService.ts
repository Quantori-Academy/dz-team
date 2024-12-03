import { Prisma, PrismaClient } from "@prisma/client";
import { SearchResults } from "../types";

import {
    SampleCreateInputSchema,
    SampleUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { Sample } from "../../../shared/generated/zod/modelSchema";
import { SampleSearch } from "../../../shared/zodSchemas/samples/sampleSearchSchema";

const prisma = new PrismaClient();

class SampleService {
    /**
     * Get all samples that are not deleted.
     * @returns {Promise<Sample[]>} An array of all non-deleted sample.
     */
    async getSamples(queryString: SampleSearch): Promise<SearchResults<Sample>> {
        const { query, page, limit, sortBy, sortOrder, searchBy, category, storageLocation } =
            queryString;

        // conditionally construct search conditions
        const searchConditions = query
            ? searchBy?.map((field) => {
                  return { [field]: { contains: query, mode: Prisma.QueryMode.insensitive } };
              })
            : null;

        // combine filter and search conditions for a query
        // <category> AND <status> AND <storageLocation> AND <query>[<name> OR <structure> OR ...]
        const where: Prisma.SampleWhereInput = {
            // FILTER CONDITIONS
            AND: [
                category ? { category } : {},
                storageLocation ? { storageLocation } : {},
                // SEARCH CONDITIONS
                // include OR condition only if there are search conditions
                searchConditions && searchConditions.length > 0 ? { OR: searchConditions } : {},
                { quantity: { gt: 0 } }, // Exclude samples with quantity 0
            ].filter(Boolean), // remove all {} conditions from AND condition
            deletedAt: null, // exclude soft-deleted records
        };

        const [samples, totalCount] = await Promise.all([
            prisma.sample.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            prisma.sample.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        const result = {
            data: samples,
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
     * Get a specific sample by its ID.
     * @param {string} id - The UUID of the sample to retrieve.
     * @returns {Promise<Sample | null>} The sample or null if not found.
     */
    async getSample(id: string): Promise<Sample | null> {
        return await prisma.sample.findUnique({ where: { id, deletedAt: null } });
    }

    /**
     * Create a new sample.
     * @param {Prisma.SampleCreateInput} newSampleData - The data to create a new sample.
     * @returns {Promise<Sample>} The newly created sample.
     */
    async createSample(newSampleData: Prisma.SampleCreateInput): Promise<Sample> {
        const validatedData = SampleCreateInputSchema.parse(newSampleData);

        return await prisma.sample.create({ data: validatedData });
    }

    /**
     * Update an existing sample by its ID.
     * @param {string} id - The UUID of the sample to update.
     * @param {Prisma.SampleUpdateInput} updateSampleData - The data to update the sample.
     * @returns {Promise<Sample>} The updated sample.
     */
    async updateSample(id: string, updateSampleData: Prisma.SampleUpdateInput): Promise<Sample> {
        const validatedData = SampleUpdateInputSchema.parse(updateSampleData);

        return await prisma.sample.update({
            where: { id, deletedAt: null },
            data: validatedData,
        });
    }

    /**
     * Soft delete a sample by setting its deletedAt field to the current date.
     * @param {string} id - The UUID of the sample to delete.
     * @returns {Promise<Sample>} The soft-deleted sample.
     */
    async deleteSample(id: string): Promise<Sample> {
        return await prisma.sample.update({ where: { id }, data: { deletedAt: new Date() } });
    }

    /**
     * Undo the soft delete of a sample by setting its deletedAt field to null.
     * @param {string} id - The UUID of the sample to restore.
     * @returns {Promise<Sample>} The restored sample.
     */
    async undoDeleteSample(id: string): Promise<Sample> {
        return await prisma.sample.update({ where: { id }, data: { deletedAt: null } });
    }
}

export const sampleService = new SampleService();
