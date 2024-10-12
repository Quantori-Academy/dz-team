import { createEffect, createEvent, createStore, sample } from "effector";

import { api } from "api/getReagents";
import { SupportedValue } from "utils/formatters";

export type Material = {
    id: string;
    name: string;
    structure: string;
    description: string;
    quantity: number;
    unit?: string;
    size?: SupportedValue;
    expirationDate?: null;
    storageLocation: string;
    cas: null;
    producer: null;
    catalogId: null;
    catalogLink: null;
    pricePerUnit: null;
    createdAt: string;
    updatedAt: string;
    [key: string]: SupportedValue;
};

// Events to set the current page and limit for pagination
export const setPage = createEvent<number>();
export const setLimit = createEvent<number>();

// Stores to hold the current page and limit values
export const page = createStore<number>(1);
export const limit = createStore<number>(5);

page.on(setPage, (_, newPage) => newPage);
limit.on(setLimit, (_, newLimit) => newLimit);

export const fetchMaterialsFx = createEffect(async () => {
    const currentPage = page.getState();
    const currentLimit = limit.getState();
    return api.ReagentsMaterials.all(currentPage, currentLimit);
});

// Store to hold the list of materials fetched
export const $materialsList = createStore<Material[]>([]).on(
    fetchMaterialsFx.doneData,
    (_, materials) => materials,
);

sample({
    source: { page, limit },
    clock: [setPage, setLimit],
    target: fetchMaterialsFx,
});
