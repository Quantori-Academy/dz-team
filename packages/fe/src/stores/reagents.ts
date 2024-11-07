import { createEffect, createEvent, sample } from "effector";
import { createGate } from "effector-react";

import { ReagentDetailsEdit } from "api/reagentDetails/contract";
import { CreateReagentType, getReagentsApi, ReagentType } from "api/reagents";
import { base } from "api/request";
import { genericDomain as domain } from "logger";

// Store to hold the list of materials fetched
export const $ReagentsList = domain.createStore<ReagentType[]>([], { name: "$ReagentsList" });

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

// Update the store when a reagent is deleted
$ReagentsList.on(deleteReagentEvent, (state, id) => state.filter((reagent) => reagent.id !== id));
$ReagentsList.on(updateReagentEvent, (state, updatedReagent) =>
    state.map((reagent) =>
        reagent.id === updatedReagent.id ? { ...reagent, ...updatedReagent } : reagent,
    ),
);
// $ReagentsList.on(addReagentEvent, (state, newReagent) => [...state, newReagent]);
// $ReagentsList.on(addReagentEvent, (state, newReagent) =>
//   produce(state, (draft) => {
//     draft.push(newReagent);
//   })
// );

// save data from server
sample({
    clock: fetchReagentsFx.doneData,
    target: $ReagentsList,
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
