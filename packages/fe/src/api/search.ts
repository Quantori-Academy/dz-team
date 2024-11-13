import { GridSortDirection } from "@mui/x-data-grid";
import { z } from "zod";

import { request } from "./request";

function getSearchResponseSchema<T extends z.ZodType>(schema: T) {
    return z.object({
        data: z.array(schema),
        meta: z.object({
            currentPage: z.number(),
            totalPages: z.number(),
            totalCount: z.number(),
            hasNextPage: z.boolean(),
            hasPreviousPage: z.boolean(),
        }),
    });
}

export const search = async <T, Z extends z.ZodType<T>>({
    page,
    pageSize,
    sortBy,
    sortOrder,
    query,
    searchBy,
    url,
    schema,
}: {
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: GridSortDirection;
    query?: string;
    searchBy: Record<string, boolean>;
    url: string;
    schema: Z;
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

    const response = await request(url, getSearchResponseSchema(schema), {
        method: "GET",
        searchParams,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response!;
};
