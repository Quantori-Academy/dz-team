import { debounce } from "lodash";
import { createEffect, createEvent, createStore, sample } from "effector";

import { getReagentsApi } from "api/getReagents";
import { SupportedValue } from "utils/formatters";

export type Material = {
    id: string;
    name: string;
    structure?: string;
    description?: string;
    quantity?: number;
    unit?: string;
    size?: SupportedValue;
    expirationDate?: null;
    storageLocation?: string;
    cas?: null;
    producer?: null;
    catalogId?: null;
    catalogLink?: null;
    pricePerUnit?: null;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: SupportedValue;
};

// Event definitions
export const setPage = createEvent<number>();
export const setLimit = createEvent<number>();
export const setSort = createEvent<string | null>();
export const setFilter = createEvent<string | null>();

// Store definitions
export const page = createStore<number>(1).on(setPage, (_, newPage) => newPage);
export const limit = createStore<number>(5);
export const sort = createStore<string>("");
export const filter = createStore<string>("");

// Update stores with events
page.on(setPage, (_, newPage) => newPage);
limit.on(setLimit, (_, newLimit) => newLimit);
sort.on(setSort, (_, newSort) => newSort);
filter.on(setFilter, (_, newFilter) => newFilter);

export const fetchMaterialsFx = createEffect(
    async (params: { page: number; limit: number; sort: string | null; filter: string | null }) => {
        return getReagentsApi.ReagentsMaterials.all(
            params.page,
            params.limit,
            params.sort,
            params.filter,
        );
    },
);
// Store to hold the list of materials fetched
export const $materialsList = createStore<Material[]>([]).on(
    fetchMaterialsFx.doneData,
    (_, materials) => materials,
);
export const debouncedSetFilter = debounce(setFilter, 300);

sample({
    source: { page, limit, sort, filter },
    clock: [setPage, setLimit, setFilter],
    target: fetchMaterialsFx,
});
