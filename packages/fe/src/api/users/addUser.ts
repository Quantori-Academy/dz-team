import { Record, Static, String } from "runtypes";

import { $auth } from "stores/auth";

import { base, request } from "../request";

const AddUser = Record({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
    role: String,
});

const token = $auth.getState()?.token;
//TODO fix types
export type NewUser = Static<typeof AddUser>;
export const PostUsers = async (userData: NewUser) => {
    await request(`${base}/api/v1/users`, AddUser, {
        method: "POST",
        json: userData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
