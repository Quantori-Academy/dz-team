import { sample } from "effector";
import { createGate } from "effector-react";

import { CurrentUser } from "api/users/contract";
import { getUser } from "api/users/getUser";
import { genericDomain as domain } from "logger";

// Store to hold the user
export const $currentUser = domain.createStore<CurrentUser | null>(null, { name: "$currentUser" });
export const fetchCurrentUserFx = domain.createEffect(async () => {
    const response = await getUser();
    return response ?? [];
});

export const UserGate = createGate({ domain });

sample({
    clock: UserGate.open,
    target: fetchCurrentUserFx,
});

// save data from server
sample({
    clock: fetchCurrentUserFx.doneData,
    target: $currentUser,
});
