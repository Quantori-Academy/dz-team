import { createEffect, createEvent, sample } from "effector";
import { createGate } from "effector-react";

import { PostUsers } from "api/users/addUser";
import { deleteUser } from "api/users/deleteUser";
import { getUsers, UserType } from "api/users/getUsers";
import { genericDomain as domain } from "logger";
import { RegisterUser } from "shared/zodSchemas";

// Store to hold the user list
export const $UsersList = domain.createStore<UserType[]>([], { name: "$UserList" });

export const deleteUserFx = createEffect(async (id: string) => {
    // TODO fix id types for validation
    const response = await deleteUser(id);
    return response;
});

export const fetchUsersFx = createEffect(async () => {
    const response = await getUsers();
    return response ?? [];
});

export const addUserFx = createEffect(async (userData: RegisterUser) => {
    const response = await PostUsers(userData);
    return response;
});

export const deleteUserId = createEvent<string>("deleteUser");
export const addNewUser = createEvent<RegisterUser>("addNewUser");

// Update store after deleting and adding new user
$UsersList.on(deleteUserId, (state, id) => state.filter((user) => user.id !== id));

$UsersList.on(addNewUser, (state, newUser) => {
    const userToAdd = {
        ...newUser,
        password: undefined,
        confirmPassword: undefined,
    };
    return [...state, userToAdd as unknown as UserType];
});

export const UsersGate = createGate({ domain });

// trigger request when gate is open
sample({
    clock: UsersGate.open,
    target: fetchUsersFx,
});

// update event for  delete user
sample({
    clock: deleteUserFx,
    target: deleteUserId,
});

sample({
    clock: addUserFx,
    target: fetchUsersFx,
});
// update event for  new user
sample({
    clock: addUserFx,
    target: addNewUser,
});

// save data from server
sample({
    clock: fetchUsersFx.doneData,
    target: $UsersList,
});
