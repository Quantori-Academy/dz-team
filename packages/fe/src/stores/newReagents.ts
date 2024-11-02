import { GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { sample } from "effector";
import { createGate } from "effector-react";

import { getNewReagents, ReagentsResponseType } from "api/newReagents";
import { genericDomain } from "logger";
import { Reagent } from "shared/generated/zod";

export const searchableFields: (keyof Reagent)[] = [
    "name",
    "description",
    "structure",
    "producer",
    "cas",
    "catalogId",
    "catalogLink",
];

export type SearchBy = {
    [key in keyof Reagent]?: boolean;
};

export const MainListGate = createGate("MainList");

export const setPagination = genericDomain.createEvent<{ page: number; pageSize: number }>();
export const setSort = genericDomain.createEvent<GridSortModel>();
export const setCategory = genericDomain.createEvent<string>();
export const setStatus = genericDomain.createEvent<string>();
export const setQuery = genericDomain.createEvent<string>();
export const setStorageLocation = genericDomain.createEvent<string>();
export const setSearchBy = genericDomain.createEvent<SearchBy>();
export const search = genericDomain.createEvent();

export const newReagentsFx = genericDomain.createEffect(
    ({
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
        return getNewReagents({
            page,
            pageSize,
            sortBy,
            sortOrder,
            category,
            status,
            query,
            storageLocation,
            searchBy,
        });
    },
);

export const $newReagents = genericDomain.createStore<ReagentsResponseType>({
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

export const $category = genericDomain.createStore("");
export const $status = genericDomain.createStore("");
export const $query = genericDomain.createStore("");
export const $storageLocation = genericDomain.createStore("");
export const $searchBy = genericDomain.createStore(
    searchableFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as SearchBy),
);

$loading.on(newReagentsFx.pending, (_, pending) => pending);
$pagination.on(setPagination, (_, result) => result);
$sort.on(setSort, (_, result) => result);
$category.on(setCategory, (_, result) => result);
$status.on(setStatus, (_, result) => result);
$query.on(setQuery, (_, result) => result);
$storageLocation.on(setStorageLocation, (_, result) => result);
$searchBy.on(setSearchBy, (_, result) => result);

sample({
    clock: [
        setPagination,
        setSort,
        setCategory,
        setStatus,
        setQuery,
        setStorageLocation,
        setSearchBy,
        MainListGate.open,
        search,
    ],
    source: {
        pagination: $pagination,
        sort: $sort,
        category: $category,
        status: $status,
        query: $query,
        storageLocation: $storageLocation,
        searchBy: $searchBy,
    },
    fn: ({ pagination, sort, category, status, query, storageLocation, searchBy }) => ({
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortBy: sort[0].field,
        sortOrder: sort[0].sort,
        category: category,
        status: status,
        query: query,
        storageLocation: storageLocation,
        searchBy,
    }),
    target: newReagentsFx,
});

$newReagents.on(newReagentsFx.doneData, (_, result) => result);
newReagentsFx.fail.watch((err) => dev.error("Error fetching reagents and samples data:", err));
