import { GridSortDirection } from "@mui/x-data-grid";
import { z } from "zod";

import { base, request } from "api/request";
import { CombinedListSchema } from "shared/generated/zod";
import { SearchBy } from "stores/reagents";

const ReagentsResponseSchema = z.object({
    data: z.array(CombinedListSchema),
    meta: z.object({
        currentPage: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean(),
        hasPreviousPage: z.boolean(),
    }),
});

export type ReagentsResponseType = z.infer<typeof ReagentsResponseSchema>;

export const getReagents = async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
    query,
    searchBy,
}: {
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: GridSortDirection;
    query?: string;
    searchBy: SearchBy;
}) => {
    const searchParams = new URLSearchParams({
        page: (page + 1).toString(),
        limit: pageSize.toString(),
        sortBy: sortBy,
        ...(sortOrder && { sortOrder }),
        ...(query && { query }),
    });

    const searchByKeys = Object.entries(searchBy)
        .filter(([_, value]) => value)
        .map(([key]) => key);

    searchByKeys.forEach((key) => {
        searchParams.append("searchBy", key);
    });

    const response = await request(`${base}/api/v1/list`, ReagentsResponseSchema, {
        method: "GET",
        searchParams,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
