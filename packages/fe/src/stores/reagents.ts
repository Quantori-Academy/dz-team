import { createEffect, sample } from "effector";
import { createGate } from "effector-react";

import { getReagentsApi, ReagentType } from "api/reagents";
import { genericDomain as domain } from "logger";

// Store to hold the list of materials fetched
export const $ReagentsList = domain.createStore<ReagentType[]>([], { name: "$ReagentsList" });

export const fetchReagentsFx = createEffect(async () => {
    const response = await getReagentsApi();
    return response ?? [];
});

export const ReagentsGate = createGate({ domain });

// save data from server
sample({
    clock: fetchReagentsFx.doneData,
    target: $ReagentsList,
});
