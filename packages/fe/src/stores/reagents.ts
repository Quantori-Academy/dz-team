import { find, merge, uniqueId } from "lodash";
import { GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { attach, sample } from "effector";
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
    unit: "ml",
    quantity: 0,
    expirationDate: new Date().toISOString().split("T")[0],
    storageLocation: "",
    currency: "",
    category: "",
};

// Store to hold the list of materials fetched
export const $reagentsList = domain.createStore<ReagentType[]>([], { name: "$reagentsList" });

export const $formData = domain.createStore<CreateReagentType>(initialFormData);
export const setFormData = domain.createEvent<CreateReagentType>();

export const fetchReagentsFx = domain.createEffect(async () => {
    const response = await getReagentsApi();
    return (response?.map((item) => ({
        ...item,
        createdAt: item.createdAt.toString(),
        updatedAt: item.updatedAt.toString(),
    })) ?? []) as ReagentType[];
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

export const setPagination = domain.createEvent<{ page: number; pageSize: number }>(
    "setPagination",
);
export const setSort = domain.createEvent<GridSortModel>("setSort");
export const setQuery = domain.createEvent<string>("setQuery");
export const setSearchBy = domain.createEvent<SearchBy>("setSearchBy");
export const search = domain.createEvent("search");

export const deleteReagent = domain.createEvent<string>("deleteReagent");
export const updateReagent = domain.createEvent<ReagentDetailsEdit>("updateReagent");
export const addReagent = domain.createEvent<CreateReagentType>("addReagent");
export const submitReagent = domain.createEvent<CreateReagentType>("submitReagent");

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

type Reagents = ReagentsResponseType["data"];
type Pagination = {
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: GridSortDirection;
    query?: string;
    searchBy: SearchBy;
};
export const $reagents = domain.createStore<Reagents>([], { name: "$reagents" });
export const $loading = domain.createStore<boolean>(false);
export const $pagination = domain.createStore<Pagination>({
    page: 1,
    pageSize: 25,
    sortBy: "name",
    sortOrder: "asc",
    searchBy: {},
});

export const reagentsFx = attach({
    source: $pagination,
    effect: async (pagination) => {
        const response = await getReagents(pagination);
        return response?.data ?? [];
    },
    domain,
    name: "reagentsFx",
});

// Update the store when a reagent is deleted
$reagents.on(deleteReagent, (state, id) =>
    produce(state, (draft) => {
        const index = draft.findIndex((reagent) => reagent.id === id);
        if (index !== -1) draft.splice(index, 1);
    }),
);
$reagents.on(updateReagent, (state, updatedReagent) => {
    const x = produce(state, (draft) => {
        const reagent = find(draft, { id: updatedReagent.id });
        if (reagent) {
            merge(reagent, updatedReagent);
        }
    });
    dev.data({ state, updatedReagent, x });
    return x;
});
$reagents.on(addReagent, (state, newReagent) =>
    produce(state, (draft) => {
        // @ts-expect-error: Temporarily bypassing type check for 'unit' property in newReagent
        draft.push({ ...newReagent, id: newReagent.id ?? uniqueId() });
    }),
);

$loading.on(reagentsFx.pending, (_, pending) => pending);
$pagination.on(setPagination, (store, { page, pageSize }) =>
    produce(store, (draft) => {
        draft.page = page;
        draft.pageSize = pageSize;
    }),
);
$pagination.on(setSort, (store, [{ field, sort }]) =>
    produce(store, (draft) => {
        draft.sortBy = field;
        draft.sortOrder = sort;
    }),
);
$pagination.on(setQuery, (store, query) =>
    produce(store, (draft) => {
        draft.query = query;
    }),
);
$pagination.on(setSearchBy, (store, searchBy) =>
    produce(store, (draft) => {
        draft.searchBy = searchBy;
    }),
);

const setSearchByWithQueryEvent = domain.createEvent();

sample({
    clock: MainListGate.open,
    target: reagentsFx,
});
sample({
    clock: reagentsFx.doneData,
    target: $reagents,
});
sample({
    clock: setSearchBy,
    source: $pagination,
    filter: (pagination) => pagination.query !== "",
    target: setSearchByWithQueryEvent,
});

sample({
    clock: [setPagination, setSort, setSearchByWithQueryEvent, MainListGate.open, search],
    target: reagentsFx,
});
sample({
    clock: addReagentFx.doneData,
    target: addReagent,
});
sample({
    clock: submitReagent,
    target: addReagentFx,
});
sample({
    clock: [deleteReagent, updateReagent, addReagent],
    target: fetchReagentsFx,
});

$reagents.on(reagentsFx.doneData, (_, result) => result);
reagentsFx.fail.watch((err) => dev.error("Error fetching reagents and samples data:", err));
