import { Array, Record, Static, String } from "runtypes";

import { base, request } from "./request";

const Users = Record({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    lastLoginDate: String,
});

const UserResponse = Array(Users).optional();
export type UserType = Static<typeof Users>;

export const getUsersApi = async () => {
    const Users = await request(`${base}/api/v1/users`, UserResponse);
    return Users;
};
