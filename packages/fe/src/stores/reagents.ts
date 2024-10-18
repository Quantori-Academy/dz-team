import { createEffect, sample } from "effector";
import { createGate } from "effector-react";
import { debounce } from "patronum";

import { getReagentsApi } from "api/getReagents";
import { genericDomain as domain } from "logger";

import { ReagentType } from "../api/reagents";

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

export const fetchReagentsFx = createEffect(
    async (params: { page: number; limit: number; sort: string | null; filter: string | null }) => {
        const response = await getReagentsApi(
            params.page,
            params.limit,
            params.sort,
            params.filter,
        );
        return response ?? [];
    },
);

// Store to hold the list of materials fetched
export const $ReagentsList = domain.createStore<ReagentType[]>([], { name: "$ReagentsList" });

export const ReagentsGate = createGate({ domain });

// request for all  materials from server when gate is open
sample({
    clock: ReagentsGate.open,
    source: { page: $page, limit: $limit, sort: $sort, filter: $filter },
    fn: ({ page, limit, sort, filter }) => ({
        page,
        limit,
        sort: sort ? `${sort.field}:${sort.order}` : null,
        filter,
    }),
    target: fetchReagentsFx,
});

// save data from server
sample({
    clock: fetchReagentsFx.doneData,
    target: $ReagentsList,
});

sample({
    clock: [$page, $limit, $sort, debounce($filter, 300)],
    source: { page: $page, limit: $limit, sort: $sort, filter: $filter },
    fn: ({ page, limit, sort, filter }) => ({
        page,
        limit,
        sort: sort ? `${sort.field}:${sort.order}` : null,
        filter,
    }),
    target: fetchReagentsFx,
});
