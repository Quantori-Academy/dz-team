import { sample } from "effector";

import { getReagentRequest, reagentRequestType } from "api/reagentRequest";
import { genericDomain } from "logger";

export const reagentRequestFx = genericDomain.createEffect(async () => {
    const response = await getReagentRequest();

    if (response == null) {
        throw new Error("Reagent requests fail");
    }

    return response;
});

export const $reagentRequestStore = genericDomain.createStore<reagentRequestType>([]);

// writes the result of reagentRequestFx to $reagentRequestStore
sample({
    clock: reagentRequestFx.doneData,
    target: $reagentRequestStore,
});
