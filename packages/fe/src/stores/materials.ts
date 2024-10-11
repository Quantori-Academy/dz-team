import { createEffect, createEvent, createStore, sample } from "effector";

import { api } from "api/getReagents";

export type Material = {
    id: string;
    name: string;
    structure: string;
    description: string;
    quantity: number;
    unit?: string;
    size?: string | number;
    expirationDate?: null;
    storageLocation: string;
    cas: null;
    producer: null;
    catalogId: null;
    catalogLink: null;
    pricePerUnit: null;
    createdAt: string;
    updatedAt: string;
};

//  event is triggered to start fetching reagents from the base.
export const fetchMaterials = createEvent();
export const selectMaterial = createEvent<string>();

// store that holds data
export const $reagentsList = createStore<Material[]>([]);
export const $selected = createStore<Material | null>(null);

export const fetchMaterialsFx = createEffect(async () => {
    return api.ReagentsMaterials.all();
});

// updatedes data
$reagentsList.on(fetchMaterialsFx.doneData, (_, materials) => materials);
$selected.on(selectMaterial, (state, id) => $reagentsList.getState().find((m) => m.id === id));

fetchMaterials.watch(fetchMaterialsFx);

sample({
    clock: fetchMaterials,
    target: fetchMaterialsFx,
});
