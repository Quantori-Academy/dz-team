import { sample } from "effector";
import { createGate } from "effector-react";

import { NewUser, PostUsers } from "api/users/addUser";
import { deleteUser } from "api/users/deleteUser";
import { getUsers, UserType } from "api/users/getUsers";
import { genericDomain as domain } from "logger";

// Store to hold the user list
export const $usersList = domain.createStore<UserType[]>([], { name: "$userList" });

export const deleteUserFx = domain.createEffect(async (id: string) => {
    const response = await deleteUser(id);
    return response;
});

export const fetchUsersFx = domain.createEffect(async () => {
    const response = await getUsers();
    return response ?? [];
});

export const addUserFx = domain.createEffect(async (userData: NewUser) => {
    const response = await PostUsers(userData);
    return response;
});

export const deleteUserId = domain.createEvent<string>("deleteUser");
export const addNewUser = domain.createEvent<NewUser>("addNewUser");

// Update store after deleting and adding new user
$usersList.on(deleteUserId, (state, id) => state.filter((user) => user.id !== id));

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
    clock: addUserFx.doneData,
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
    target: $usersList,
});
