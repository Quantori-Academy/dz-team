import { debounce } from "lodash";
import { createEffect, createEvent, createStore, sample } from "effector";

import { getReagentsApi } from "api/getReagents";
import { SupportedValue } from "utils/formatters";

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
export const setPage = createEvent<number>();
export const setLimit = createEvent<number>();
export const setSort = createEvent<{ field: string; order: "asc" | "desc" }>();
export const setFilter = createEvent<string | null>();

// Store definitions
export const page = createStore<number>(1).on(setPage, (_, newPage) => newPage);
export const limit = createStore<number>(5);
export const sort = createStore<{ field: string; order: "asc" | "desc" }>({
    field: "name",
    order: "asc",
}).on(setSort, (_, newSort) => newSort);
export const filter = createStore<string>("");

// Update stores with events
page.on(setPage, (_, newPage) => newPage);
limit.on(setLimit, (_, newLimit) => newLimit);
filter.on(setFilter, (_, newFilter) => newFilter);

export const fetchMaterialsFx = createEffect(
    async (params: { page: number; limit: number; sort: string | null; filter: string | null }) => {
        const response = await getReagentsApi.ReagentsMaterials.all(
            params.page,
            params.limit,
            params.sort,
            params.filter,
        );

        return response || [];
    },
);
// Store to hold the list of materials fetched

export const $materialsList = createStore<Material[] | undefined>([]).on(
    fetchMaterialsFx.doneData,
    (_, materials) => materials,
);
export const debouncedSetFilter = debounce(setFilter, 300);
sample({
    source: { page, limit, sort, filter },
    clock: [setPage, setLimit, setFilter, setSort],
    fn: ({ page, limit, sort, filter }) => ({
        page,
        limit,
        sort: sort ? `${sort.field}:${sort.order}` : null,
        filter,
    }),
    target: fetchMaterialsFx,
});
