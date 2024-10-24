import { createEffect, sample } from "effector";
import { createGate } from "effector-react";

import { deleteUser } from "api/deleteUser";
import { getUsers, UserType } from "api/users";
import { genericDomain as domain } from "logger";

// Store to hold the user list
export const $UsersList = domain.createStore<UserType[]>([], { name: "$UserList" });

export const deleteUserFx = createEffect(async (id: string) => {
    const response = await deleteUser(id);

    return response;
});

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

// Update usersList store after deleting user
sample({
    clock: deleteUserFx.doneData,
    source: $UsersList,
    fn: (userList, deletedId: string) => userList.filter((user) => user.id !== deletedId),
    target: $UsersList,
});
