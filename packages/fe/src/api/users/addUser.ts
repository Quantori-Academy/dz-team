import { Record, Static, String } from "runtypes";

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

//TODO fix types
export type NewUser = Static<typeof AddUser>;
export const PostUsers = async (userData: NewUser) => {
    await request(`${base}/api/v1/users`, AddUser, {
        method: "POST",
        json: userData,
    });
};
