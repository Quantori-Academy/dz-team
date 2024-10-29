import { Array, Record, Static, String } from "runtypes";

import { $auth } from "stores/auth";

import { base, request } from "../request";

const User = Record({
    createdAt: String.nullable(),
    email: String.nullable(),
    firstName: String.nullable(),
    id: String,
    lastName: String.nullable(),
    role: String.nullable(),
    updatedAt: String.nullable(),
    username: String.nullable(),
    lastLoginDate: String.nullable(),
});

const UsersResponse = Array(User).optional();
export type UserType = Static<typeof User>;

const token = $auth.getState()?.token;

export const getUsers = async () => {
    const Users = await request(`${base}/api/v1/users`, UsersResponse, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return Users;
};
