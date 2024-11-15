import { GridSortDirection } from "@mui/x-data-grid";
import { z } from "zod";

import { base, request } from "api/request";
import { ReagentSchema } from "shared/generated/zod";
import { SearchBy } from "stores/reagents";

const _Reagent = z.object({
    id: z.string().optional(),
    name: z.string().nullable(),
    structure: z.string().nullable(),
    description: z.string().nullable(),
    quantity: z.number(),
    unit: z
        .string()
        .nullable()
        .transform((val) => val || "ml"),
    expirationDate: z.string().nullable(),
    storageLocation: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    cas: z.string().nullable(),
    producer: z.string().nullable(),
    catalogId: z.string().nullable(),
    catalogLink: z.string().nullable(),
    pricePerUnit: z.number().nullable(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
});

export const _CreateReagentContract = z.object({
    name: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    description: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    structure: z.string().nullable(),
    cas: z.string().nullable(),
    producer: z.string().nullable(),
    catalogId: z.string().nullable(),
    catalogLink: z.string().nullable(),
    pricePerUnit: z.number().nullable(),
    unit: z
        .string()
        .nullable()
        .transform((val) => val || "ml"),
    quantity: z.number(),
    expirationDate: z.string().nullable(),
    storageLocation: z.string(),
    id: z.string().optional(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    currency: z
        .string()
        .nullable()
        .transform((val) => val || "usd"),
    category: z
        .string()
        .nullable()
        .transform((val) => val || "reagent"),
});

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

const ReagentsResponse = z.object({ data: z.array(ReagentSchema) });

export type ReagentType = z.infer<typeof _Reagent>;
export type CreateReagentType = z.infer<typeof _CreateReagentContract>;
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

    const response = await request(`${base}/api/v1/reagents`, ReagentsResponseSchema, {
        method: "GET",
        searchParams,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
// TODO: remove after `search params` refactoring in `getResponse` function
export const getReagentsApi = async () => {
    const reagents = await request(`${base}/api/v1/reagents`, ReagentsResponse);
    return reagents?.data;
};
