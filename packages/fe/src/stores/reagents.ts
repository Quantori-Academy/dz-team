import { GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { sample } from "effector";
import { createGate } from "effector-react";
import { produce } from "immer";

import { ReagentDetailsEdit } from "api/reagentDetails/contract";
import {
    CreateReagentType,
    getReagents,
    getReagentsApi,
    ReagentsResponseType,
    ReagentType,
} from "api/reagents";
import { base } from "api/request";
import { genericDomain as domain } from "logger";
import { Reagent } from "shared/generated/zod";

export const initialFormData: CreateReagentType = {
    name: "",
    description: "",
    structure: "",
    cas: "",
    producer: "",
    catalogId: "",
    catalogLink: "",
    pricePerUnit: 0,
    unit: "",
    quantity: 0,
    expirationDate: new Date().toISOString().split("T")[0],
    storageLocation: "",
};

// Store to hold the list of materials fetched
export const $reagentsList = domain.createStore<ReagentType[]>([], { name: "$reagentsList" });

export const $formData = domain.createStore<CreateReagentType>(initialFormData);
export const setFormData = domain.createEvent<CreateReagentType>();

export const fetchReagentsFx = domain.createEffect(async () => {
    const response = await getReagentsApi();
    return response ?? [];
});

export const addReagentFx = domain.createEffect(async (data: CreateReagentType) => {
    const response = await fetch(`${base}/api/v1/reagents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await response.json();
});

export const ReagentsGate = createGate({ domain });

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

export const setPagination = domain.createEvent<{ page: number; pageSize: number }>();
export const setSort = domain.createEvent<GridSortModel>();
export const setQuery = domain.createEvent<string>();
export const setSearchBy = domain.createEvent<SearchBy>();
export const search = domain.createEvent();

export const deleteReagentEvent = domain.createEvent<string>();
export const updateReagentEvent = domain.createEvent<ReagentDetailsEdit>();
export const addReagentEvent = domain.createEvent<CreateReagentType>();
export const submitReagentEvent = domain.createEvent<CreateReagentType>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

// Update the store when a reagent is deleted
$reagentsList.on(deleteReagentEvent, (state, id) =>
    produce(state, (draft) => {
        return draft.filter((reagent) => reagent.id !== id);
    })
);
$reagentsList.on(updateReagentEvent, (state, updatedReagent) =>
    produce(state, (draft) => {
        const index = draft.findIndex((reagent) => reagent.id === updatedReagent.id);
        if (index !== -1) {
            draft[index] = { ...draft[index], ...updatedReagent };
        }
    })
);
$reagentsList.on(addReagentEvent, (state, newReagent) =>
    produce(state, (draft) => {
        draft.push(newReagent);
    })
);

export const reagentsFx = domain.createEffect(
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
    }
);

export const $reagents = domain.createStore<ReagentsResponseType>({
    data: [],
    meta: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    },
});
export const $loading = domain.createStore<boolean>(false);
export const $pagination = domain.createStore({ page: 0, pageSize: 25 });
export const $sort = domain.createStore<GridSortModel>([
    {
        field: "name",
        sort: "asc",
    },
]);

export const $query = domain.createStore("");
export const $searchBy = domain.createStore(
    searchableFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as SearchBy)
);

$loading.on(reagentsFx.pending, (_, pending) => pending);
$pagination.on(setPagination, (_, result) => result);
$sort.on(setSort, (_, result) => result);

$query.on(setQuery, (_, result) => result);
$searchBy.on(setSearchBy, (_, result) => result);

const setSearchByWithQueryEvent = domain.createEvent();

sample({
    clock: fetchReagentsFx.doneData,
    target: $reagentsList,
});
sample({
    clock: ReagentsGate.open,
    target: fetchReagentsFx,
});
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
        addReagentFx.doneData,
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

sample({
    clock: addReagentFx.doneData,
    target: addReagentEvent,
});
sample({
    clock: submitReagentEvent,
    target: addReagentFx,
});
sample({
    clock: [deleteReagentEvent, updateReagentEvent, addReagentEvent],
    target: fetchReagentsFx,
});

$reagents.on(reagentsFx.doneData, (_, result) => result);
reagentsFx.fail.watch((err) => dev.error("Error fetching reagents and samples data:", err));
