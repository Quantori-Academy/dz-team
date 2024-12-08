// External dependencies
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Internal utilities
import { prisma } from "../utils/prisma";
import { SearchResults } from "../types";

// Shared schemas
import { SampleSearch } from "../../../shared/zodSchemas/samples/sampleSearchSchema";
import {
    SampleCreateSchema,
    SampleUpdateSchema,
} from "../../../shared/zodSchemas/samples/extendedSampleSchemas";

// Generated schemas
import { Sample } from "../../../shared/generated/zod/modelSchema";

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
     * @param { SampleCreateSchema } newSampleData - The data to create a new sample.
     * @returns {Promise<Sample>} The newly created sample.
     */
    async createSample(newSampleData: z.infer<typeof SampleCreateSchema>): Promise<Sample> {
        const validatedData = SampleCreateSchema.parse(newSampleData);

        // Destructure the necessary fields from the validated data
        const { reagentIds = [], ...sampleData } = validatedData;

        // Prepare the Prisma-compatible data
        const prismaData = {
            ...sampleData,
            reagents:
                reagentIds.length > 0 ? { connect: reagentIds.map((id) => ({ id })) } : undefined,
        };

        // Pass the parsed and validated data to Prisma
        return await prisma.sample.create({
            data: prismaData,
            include: { reagents: true }, // Include related reagents in the response
        });
    }

    /**
     * Update an existing sample by its ID.
     * @param {string} id - The UUID of the sample to update.
     * @param {SampleUpdateSchema} updateSampleData - The data to update the sample.
     * @returns {Promise<Sample>} The updated sample.
     */
    async updateSample(
        updateData: z.infer<typeof SampleUpdateSchema>,
        id: string,
    ): Promise<Sample> {
        // Validate and parse the incoming data using Zod
        const validatedData = SampleUpdateSchema.parse(updateData);

        const { reagentIds, ...updateFields } = validatedData;

        // Prepare the update payload, connecting reagents
        const updatePayload = {
            ...updateFields,
            reagents: reagentIds ? { set: reagentIds.map((id) => ({ id })) } : undefined, // Update reagents
        };

        // Update the sample in the database
        const updatedSample = await prisma.sample.update({
            where: { id: id },
            data: updatePayload,
            include: { reagents: true },
        });

        return updatedSample;
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
