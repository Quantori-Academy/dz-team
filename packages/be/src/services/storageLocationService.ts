// External dependencies
import { Prisma, Reagent } from "@prisma/client";

// Internal utilities
import { prisma } from "../utils/prisma";

// Shared schemas
import { StorageLocationSearch } from "../../../shared/zodSchemas/storageLocation/storageLocationSearchSchema";

// Generated schemas
import {
    StorageLocationCreateInputSchema,
    StorageLocationUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { StorageLocation } from "../../../shared/generated/zod";

// Internal types
import { SearchResults } from "../types";

class StorageLocationService {
    /**
     * Retrieve all storage locations with optional filtering, pagination, and sorting.
     *
     * @param {StorageLocationSearch} queryString - The search parameters including optional filters for pagination and sorting.
     * @returns {Promise<SearchResults>} A promise that resolves to an object containing storage locations and metadata about the results.
     */
    async getAllStorageLocations(
        queryString: StorageLocationSearch,
    ): Promise<SearchResults<StorageLocation>> {
        const { query, page, limit, sortBy, sortOrder, room, name } = queryString;

        // Conditions for search across name, room, or description fields
        const searchConditions = query
            ? [
                  { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { room: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { description: { contains: query, mode: Prisma.QueryMode.insensitive } },
              ]
            : null;

        // Building the `where` clause with optional filters for `room` and `name`
        const where: Prisma.StorageLocationWhereInput = {
            AND: [
                room ? { room: { contains: room, mode: Prisma.QueryMode.insensitive } } : {},
                name ? { name: { contains: name, mode: Prisma.QueryMode.insensitive } } : {},
                searchConditions ? { OR: searchConditions } : {},
                { deletedAt: null },
            ].filter(Boolean),
        };

        // Fetching paginated results and total count in parallel
        const [storageLocations, totalCount] = await Promise.all([
            prisma.storageLocation.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            prisma.storageLocation.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            data: storageLocations,
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
     * Retrieve a specific storage location by ID, including its connected reagents.
     *
     * @param {string} id - The ID of the storage location to retrieve.
     * @returns {Promise<StorageLocation & { reagents: Reagent[] } | null>} A promise that resolves to the storage location with its reagents if found, or null if not found.
     */
    async getStorageLocation(
        id: string,
    ): Promise<(StorageLocation & { reagents: Reagent[] }) | null> {
        return prisma.storageLocation.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                reagents: true,
            },
        });
    }

    /**
     * Create a new storage location.
     *
     * @param {Prisma.StorageLocationCreateInput} newStorageLocationData - The data for the new storage location.
     * @returns {Promise<StorageLocation>} A promise that resolves to the created storage location object.
     */
    async createStorageLocation(
        newStorageLocationData: Prisma.StorageLocationCreateInput,
    ): Promise<StorageLocation> {
        const validatedData = StorageLocationCreateInputSchema.parse(newStorageLocationData);
        return prisma.storageLocation.create({ data: validatedData });
    }

    /**
     * Update an existing storage location.
     *
     * @param {string} id - The ID of the storage location to update.
     * @param {Prisma.StorageLocationUpdateInput} updateStorageLocationData - The data to update the storage location.
     * @returns {Promise<StorageLocation>} A promise that resolves to the updated storage location object.
     */
    async updateStorageLocation(
        id: string,
        updateStorageLocationData: Prisma.StorageLocationUpdateInput,
    ): Promise<StorageLocation> {
        const validatedData = StorageLocationUpdateInputSchema.parse(updateStorageLocationData);
        return prisma.storageLocation.update({
            where: { id },
            data: validatedData,
        });
    }

    /**
     * Soft delete a storage location by setting its deletedAt field to the current date.
     * @param {string} id - The ID of the storage location to delete.
     * @returns {Promise<StorageLocation | { message: string }>} The soft-deleted storage location or a message if deletion is restricted.
     */
    async deleteStorageLocation(id: string): Promise<StorageLocation> {
        // Check for associated reagents
        const reagentCount = await prisma.reagent.count({
            where: { storageId: id },
        });

        const locationById = (await prisma.storageLocation.findUnique({
            where: { id: id },
        }))!;

        if (reagentCount > 0) {
            // return same location without updating deletedAt
            return locationById;
        }

        // Update deletedAt to for soft deletion
        return prisma.storageLocation.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

    /**
     * Undo the soft delete of a storage location by setting its deletedAt field to null.
     * @param {string} id - The ID of the storage location to restore.
     * @returns {Promise<StorageLocation>} The restored storage location.
     */
    async undoDeleteStorageLocation(id: string): Promise<StorageLocation> {
        return prisma.storageLocation.update({
            where: { id },
            data: { deletedAt: null },
        });
    }

    /**
     * Moves a reagent to a new storage location.
     *
     * @param {string} reagentId - The ID of the reagent to move.
     * @param {string} newStorageLocationId - The ID of the new storage location.
     * @returns {Promise<Reagent>} A promise that resolves to the updated reagent after moving.
     * @throws {Error} Throws an error if the reagent is not found.
     */
    async moveReagent(reagentId: string, newStorageLocationId: string): Promise<Reagent> {
        // Validate new storage location ID
        const storageLocation = await prisma.storageLocation.findUnique({
            where: { id: newStorageLocationId },
        });
        if (!storageLocation) {
            throw new Error("Storage location not found");
        }

        // Find the reagent to move
        const reagent = await prisma.reagent.findUnique({
            where: { id: reagentId },
        });

        if (!reagent) {
            throw new Error("Reagent not found");
        }

        // Update the reagent's storage location
        const updatedReagent = await prisma.reagent.update({
            where: { id: reagentId },
            data: { storageId: newStorageLocationId },
        });

        return updatedReagent;
    }
}

export const storageLocationService = new StorageLocationService();
