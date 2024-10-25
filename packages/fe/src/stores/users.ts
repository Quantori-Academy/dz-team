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

// TODO fix type
sample({
    clock: deleteUserFx.doneData,
    source: $UsersList,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    fn: (userList, deletedId) => userList.filter((user: any) => user.id !== deletedId),

    target: $UsersList,
});
