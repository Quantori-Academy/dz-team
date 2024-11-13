import { sample } from "effector";
import { createGate } from "effector-react";

import { PostUsers } from "api/users/addUser";
import { deleteUser } from "api/users/deleteUser";
import { getUsers, UserType } from "api/users/getUsers";
import { NewUser } from "hooks/useUserForm";
import { genericDomain as domain } from "logger";

// Store to hold the user list
export const $usersList = domain.createStore<UserType[]>([], { name: "$userList" });

export const fetchUsersFx = domain.createEffect(async () => {
    const response = await getUsers();
    return response ?? [];
});

export const deleteUserFx = domain.createEffect(async (id: string) => {
    const response = await deleteUser(id);
    return response;
});

export const addUserFx = domain.createEffect(async (userData: NewUser) => {
    const response = await PostUsers(userData);
    return response;
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

// trigger user request when user is deleted
sample({
    clock: deleteUserFx.doneData,
    target: fetchUsersFx,
});

// trigger user request when new user is added
sample({
    clock: addUserFx.doneData,
    target: fetchUsersFx,
});
