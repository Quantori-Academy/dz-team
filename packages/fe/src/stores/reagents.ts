import { createEffect, createEvent, sample } from "effector";
import { createGate } from "effector-react";

import { ReagentDetailsEdit } from "api/reagentDetails/contract";
import { getReagentsApi, ReagentType } from "api/reagents";
import { genericDomain as domain } from "logger";

// Store to hold the list of materials fetched
export const $ReagentsList = domain.createStore<ReagentType[]>([], { name: "$ReagentsList" });

export const fetchReagentsFx = createEffect(async () => {
    const response = await getReagentsApi();
    return response ?? [];
});

export const ReagentsGate = createGate({ domain });

export const deleteReagentEvent = createEvent<string>();
export const updateReagentEvent = createEvent<ReagentDetailsEdit>();
// Update the store when a reagent is deleted
$ReagentsList.on(deleteReagentEvent, (state, id) => state.filter((reagent) => reagent.id !== id));
$ReagentsList.on(updateReagentEvent, (state, updatedReagent) =>
    state.map((reagent) =>
        reagent.id === updatedReagent.id ? { ...reagent, ...updatedReagent } : reagent,
    ),
);

// save data from server
sample({
    clock: fetchReagentsFx.doneData,
    target: $ReagentsList,
});

sample({
    clock: ReagentsGate.open,
    target: fetchReagentsFx,
});
