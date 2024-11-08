import { createEffect, createEvent, sample } from "effector";
import { createGate } from "effector-react";
import { produce } from "immer";

import { ReagentDetailsEdit } from "api/reagentDetails/contract";
import { CreateReagentType, getReagentsApi, ReagentType } from "api/reagents";
import { base } from "api/request";
import { genericDomain as domain } from "logger";

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
export const setFormData = createEvent<CreateReagentType>();

export const fetchReagentsFx = createEffect(async () => {
    const response = await getReagentsApi();
    return response ?? [];
});
export const addReagentFx = createEffect(async (data: CreateReagentType) => {
    const response = await fetch(`${base}/api/v1/reagents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const newReagent = await response.json();
    return newReagent;
});

export const ReagentsGate = createGate({ domain });

export const deleteReagentEvent = createEvent<string>();
export const updateReagentEvent = createEvent<ReagentDetailsEdit>();
export const addReagentEvent = createEvent<CreateReagentType>();
export const submitReagentEvent = createEvent<CreateReagentType>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

// Update the store when a reagent is deleted
$reagentsList.on(deleteReagentEvent, (state, id) =>
    produce(state, (draft) => {
        return draft.filter((reagent) => reagent.id !== id);
    }),
);
$reagentsList.on(updateReagentEvent, (state, updatedReagent) =>
    produce(state, (draft) => {
        const index = draft.findIndex((reagent) => reagent.id === updatedReagent.id);
        if (index !== -1) {
            draft[index] = { ...draft[index], ...updatedReagent };
        }
    }),
);
$reagentsList.on(addReagentEvent, (state, newReagent) =>
    produce(state, (draft) => {
        draft.push(newReagent);
    }),
);

// save data from server
sample({
    clock: fetchReagentsFx.doneData,
    target: $reagentsList,
});

sample({
    clock: ReagentsGate.open,
    target: fetchReagentsFx,
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
