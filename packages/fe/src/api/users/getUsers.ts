import { Array, Record, Static, String } from "runtypes";

import { base, request } from "../request";

const User = Record({
    createdAt: String.nullable(),
    email: String.nullable(),
    firstName: String.nullable(),
    id: String,
    lastName: String.nullable(),
    password: String.nullable(),
    role: String.nullable(),
    updatedAt: String.nullable(),
    username: String.nullable(),
});

const UsersResponse = Array(User).optional();
export type UserType = Static<typeof User>;

export const getUsers = async () => {
    await request(`${base}/api/v1/users`, UsersResponse, {
        method: "GET",
    });
};
