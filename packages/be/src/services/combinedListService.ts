// External dependencies
import { Prisma } from "@prisma/client";

// Shared schemas
import { CombinedList } from "../../../shared/generated/zod/modelSchema";
import { CombinedListSearch } from "../../../shared/zodSchemas/combinedList/combinedListSearchSchema";

// Internal utilities
import { SearchResults } from "../types";
import { prisma } from "../utils/prisma";

class CombinedListService {
    /**
     * Get all reagents and samples that are not deleted.
     * @returns {Promise<SearchResults>} Combined list of reagents and samples.
     */
    async getAllItems(queryParams: CombinedListSearch): Promise<SearchResults<CombinedList>> {
        const {
            query,
            page = 1,
            limit = 10,
            sortBy = "name",
            sortOrder = "asc",
            searchBy,
            category,
            storageLocation,
            status,
        } = queryParams;

        // Build search filters
        const searchFilters = query
            ? searchBy?.map((field) => ({
                  [field]: { contains: query, mode: Prisma.QueryMode.insensitive },
              }))
            : null;

        const filterConditions = {
            AND: [
                category ? { category } : {},
                storageLocation ? { storageLocation } : {},
                status ? { status } : {},
                searchFilters && searchFilters.length > 0 ? { OR: searchFilters } : {},
            ].filter(Boolean),
            deletedAt: null, // Exclude soft-deleted records
        };

        // Fetch data for reagents and samples
        const [reagents, samples] = await Promise.all([
            prisma.reagent.findMany({ where: filterConditions }),
            prisma.sample.findMany({ where: filterConditions }),
        ]);

        // Combine and sort results
        const combinedResults = [...reagents, ...samples];
        combinedResults.sort((itemA, itemB) => {
            const fieldA = String(itemA[sortBy as keyof typeof itemA] ?? "");
            const fieldB = String(itemB[sortBy as keyof typeof itemB] ?? "");
            return sortOrder === "asc"
                ? fieldA.localeCompare(fieldB)
                : fieldB.localeCompare(fieldA);
        });

        // Paginate results
        const totalItems = combinedResults.length;
        const totalPages = Math.ceil(totalItems / limit);
        const paginatedResults = combinedResults.slice((page - 1) * limit, page * limit);

        // Construct response
        return {
            data: paginatedResults,
            meta: {
                currentPage: page,
                totalPages,
                totalCount: totalItems,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
}

export const combinedListService = new CombinedListService();
