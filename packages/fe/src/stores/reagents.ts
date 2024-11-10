import { GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { sample } from "effector";
import { createGate } from "effector-react";

import { ReagentDetailsEdit } from "api/reagentDetails/contract";
import { getReagents, ReagentsResponseType } from "api/reagents";
import { genericDomain } from "logger";
import { CombinedList } from "shared/generated/zod";

export const searchableFields: (keyof CombinedList)[] = [
    "name",
    "description",
    "structure",
    "producer",
    "cas",
    "catalogId",
    "catalogLink",
];

export type SearchBy = {
    [key in keyof CombinedList]?: boolean;
};

export const MainListGate = createGate("MainList");

export const setPagination = genericDomain.createEvent<{ page: number; pageSize: number }>();
export const setSort = genericDomain.createEvent<GridSortModel>();
export const setQuery = genericDomain.createEvent<string>();
export const setSearchBy = genericDomain.createEvent<SearchBy>();
export const search = genericDomain.createEvent();

export const reagentsFx = genericDomain.createEffect(
    ({
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
        return getReagents({
            page,
            pageSize,
            sortBy,
            sortOrder,
            query,
            searchBy,
        });
    },
);

export const deleteReagentEvent = genericDomain.createEvent<string>();
export const updateReagentEvent = genericDomain.createEvent<ReagentDetailsEdit>();

export const $reagents = genericDomain.createStore<ReagentsResponseType>({
    data: [],
    meta: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    },
});
export const $loading = genericDomain.createStore<boolean>(false);
export const $pagination = genericDomain.createStore({ page: 0, pageSize: 25 });
export const $sort = genericDomain.createStore<GridSortModel>([
    {
        field: "name",
        sort: "asc",
    },
]);

export const $query = genericDomain.createStore("");
export const $searchBy = genericDomain.createStore(
    searchableFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as SearchBy),
);

$loading.on(reagentsFx.pending, (_, pending) => pending);
$pagination.on(setPagination, (_, result) => result);
$sort.on(setSort, (_, result) => result);

$query.on(setQuery, (_, result) => result);
$searchBy.on(setSearchBy, (_, result) => result);

const setSearchByWithQueryEvent = genericDomain.createEvent();

sample({
    clock: [setSearchBy],
    source: {
        query: $query,
    },
    filter: ({ query }) => query !== "",
    target: setSearchByWithQueryEvent,
});

sample({
    clock: [
        setPagination,
        setSort,
        setSearchByWithQueryEvent,
        MainListGate.open,
        search,
        deleteReagentEvent,
        updateReagentEvent,
    ],
    source: {
        pagination: $pagination,
        sort: $sort,
        query: $query,
        searchBy: $searchBy,
    },
    fn: ({ pagination, sort, query, searchBy }) => ({
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortBy: sort[0].field,
        sortOrder: sort[0].sort,
        query,
        searchBy,
    }),
    target: reagentsFx,
});

$reagents.on(reagentsFx.doneData, (_, result) => result);
reagentsFx.fail.watch((err) => dev.error("Error fetching reagents and samples data:", err));
