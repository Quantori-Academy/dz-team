import { sample } from "effector";
import { createGate } from "effector-react";

import { NewUser } from "api/types";
import { PostUsers } from "api/users/addUser";
import { deleteUser } from "api/users/deleteUser";
import { getUsers, UserType } from "api/users/getUsers";
import { genericDomain as domain } from "logger";

// Store to hold the user list
export const $usersList = domain.createStore<UserType[]>([], { name: "$userList" });

export const fetchUsersFx = domain.createEffect(async () => {
    const response = await getUsers();
    return response?.data ?? [];
});

export const deleteUserFx = domain.createEffect(async (id: string) => {
    return await deleteUser(id);
});

export const addUserFx = domain.createEffect(async (userData: NewUser) => {
    return await PostUsers(userData);
});

export const UsersGate = createGate({ domain });

// trigger user request when gate is open
sample({
    clock: UsersGate.open,
    target: fetchUsersFx,
});

// save data from server
sample({
    clock: fetchUsersFx.doneData,
    target: $usersList,
});

// trigger user request when user is deleted and added a new one
sample({
    clock: [deleteUserFx.doneData, addUserFx.doneData],
    target: fetchUsersFx,
});
