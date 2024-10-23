import { Array, Record, Static, String } from "runtypes";

import { base, request } from "./request";

const User = Record({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    lastLoginDate: String,
});

const UsersResponse = Array(User).optional();
export type UserType = Static<typeof User>;

export const getUsers = async () => {
    const Users = await request(`${base}/api/v1/users`, UsersResponse);
    return Users;
};
