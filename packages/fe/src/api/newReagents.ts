import { GridSortDirection } from "@mui/x-data-grid";
import { z } from "zod";

import { base, request } from "api/request";
import { ReagentSchema } from "shared/generated/zod";
import { SearchBy } from "stores/newReagents";

const ReagentsResponseSchema = z.object({
    data: z.array(ReagentSchema),
    meta: z.object({
        currentPage: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean(),
        hasPreviousPage: z.boolean(),
    }),
});

export type ReagentsResponseType = z.infer<typeof ReagentsResponseSchema>;

export const getNewReagents = async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
    category,
    status,
    query,
    storageLocation,
    searchBy,
}: {
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: GridSortDirection;
    category?: string;
    status?: string;
    query?: string;
    storageLocation: string;
    searchBy: SearchBy;
}) => {
    const searchParams = new URLSearchParams({
        page: (page + 1).toString(),
        limit: pageSize.toString(),
        sortBy: sortBy,
        ...(sortOrder && { sortOrder }),
        ...(category && { category }),
        ...(status && { status }),
        ...(query && { query }),
        storageLocation: storageLocation,
    });

    const searchByKeys = Object.entries(searchBy)
        .filter(([_, value]) => value)
        .map(([key]) => key);

    searchByKeys.forEach((key) => {
        searchParams.append("searchBy", key);
    });

    const response = await request(`${base}/api/v1/reagents`, ReagentsResponseSchema, {
        method: "GET",
        searchParams,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
