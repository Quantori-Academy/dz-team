import { createEffect, sample } from "effector";
import { createGate } from "effector-react";

import { getUsers, UserType } from "api/users";
import { genericDomain as domain } from "logger";

// Store to hold the user list
export const $UsersList = domain.createStore<UserType[]>([], { name: "$UserList" });

export const fetchUsersFx = createEffect(async () => {
    const response = await getUsers();
    return response ?? [];
});

export const UsersGate = createGate({ domain });

// trigger request when gate is open
sample({
    clock: UsersGate.open,
    target: fetchUsersFx,
});

// save data from server
sample({
    clock: fetchUsersFx.doneData,
    target: $UsersList,
});
