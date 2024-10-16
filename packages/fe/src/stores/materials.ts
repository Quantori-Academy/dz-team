import { createEffect, sample } from "effector";
import { createGate } from "effector-react";
import { debounce } from "patronum";

import { getReagentsApi } from "api/getReagents";
import { genericDomain as domain } from "logger";
import { SupportedValue } from "utils/formatters";

import { ReagentType } from "../api/request";

export type Material = {
    cas: string | null;
    catalogId: string | null;
    catalogLink: string | null;
    createdAt: string;
    description: string;
    expirationDate: string | null;
    id: string;
    name: string;
    pricePerUnit: number | null;
    producer: string | null;
    quantity: number;
    size: number | null;
    storageLocation: string;
    structure: string | null;
    unit: string;
    updatedAt: string;
    [key: string]: SupportedValue;
};

// Event definitions
export const setPage = domain.createEvent<number>("setPage");
export const setLimit = domain.createEvent<number>("setLimit");
export const setSort = domain.createEvent<{ field: string; order: "asc" | "desc" }>("setSort");
export const setFilter = domain.createEvent<string | null>("setFilter");

// Store definitions
export const $page = domain
    .createStore<number>(1, { name: "$page" })
    .on(setPage, (_, newPage) => newPage);
export const $limit = domain.createStore<number>(5, { name: "$limit" });
export const $sort = domain
    .createStore<{ field: string; order: "asc" | "desc" }>(
        {
            field: "name",
            order: "asc",
        },
        { name: "$sort" },
    )
    .on(setSort, (_, newSort) => newSort);
export const $filter = domain.createStore<string>("", { name: "$filter" });

// Update stores with events
$page.on(setPage, (_, newPage) => newPage);
$limit.on(setLimit, (_, newLimit) => newLimit);
$filter.on(setFilter, (_, newFilter) => newFilter);

export const fetchMaterialsFx = createEffect(
    async (params: { page: number; limit: number; sort: string | null; filter: string | null }) => {
        const response = await getReagentsApi.ReagentsMaterials.all(
            params.page,
            params.limit,
            params.sort,
            params.filter,
        );

        return response ?? [];
    },
);
// Store to hold the list of materials fetched

export const $materialsList = domain.createStore<ReagentType[]>([], { name: "$materialsList" });

export const MaterialsGate = createGate({ domain });
// request for all  materials from server when gate is open
sample({
    clock: MaterialsGate.open,
    source: { page: $page, limit: $limit, sort: $sort, filter: $filter },
    fn: ({ page, limit, sort, filter }) => ({
        page,
        limit,
        sort: sort ? `${sort.field}:${sort.order}` : null,
        filter,
    }),
    target: fetchMaterialsFx,
});

// save data from server
sample({
    clock: fetchMaterialsFx.doneData,
    target: $materialsList,
});

// export const debouncedSetFilter = debounce(setFilter, 300);

sample({
    clock: [$page, $limit, $sort, debounce($filter, 300)],
    source: { page: $page, limit: $limit, sort: $sort, filter: $filter },
    fn: ({ page, limit, sort, filter }) => ({
        page,
        limit,
        sort: sort ? `${sort.field}:${sort.order}` : null,
        filter,
    }),
    target: fetchMaterialsFx,
});
