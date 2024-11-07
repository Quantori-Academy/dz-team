import { Prisma, PrismaClient } from "@prisma/client";
import { CombinedList } from "../../../shared/generated/zod/modelSchema";
import { CombinedListSearch } from "../../../shared/zodSchemas";

const prisma = new PrismaClient();

type SearchResults = {
    data: CombinedList[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

export class CombinedListService {
    /**
     * Get all reagents and samples that are not deleted.
     * @returns {Promise<CombinedList[]>} An array of all non-deleted reagents and samples.
     */
    async getAllItems(queryString: CombinedListSearch): Promise<SearchResults> {
        const {
            query,
            page,
            limit,
            sortBy,
            sortOrder,
            searchBy,
            type,
            status,
            category,
            storageLocation,
        } = queryString;

        // conditionally construct search conditions
        const searchConditions = query
            ? searchBy?.map((field) => {
                  return { [field]: { contains: query, mode: Prisma.QueryMode.insensitive } };
              })
            : null;

        // combine filter and search conditions for a query
        // <category> AND <status> AND <storageLocation> AND <query>[<name> OR <structure> OR ...]
        const where: Prisma.CombinedListWhereInput = {
            // FILTER CONDITIONS
            AND: [
                type ? { type } : {},
                category ? { category } : {},
                status ? { status } : {},
                storageLocation ? { storageLocation } : {},
                // SEARCH CONDITIONS
                // include OR condition only if there are search conditions
                searchConditions && searchConditions.length > 0 ? { OR: searchConditions } : {},
            ].filter(Boolean), // remove all {} conditions from AND condition
            deletedAt: null, // exclude soft-deleted records
        };

        const [items, totalCount] = await Promise.all([
            prisma.combinedList.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            prisma.combinedList.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        const result = {
            data: items,
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
}
