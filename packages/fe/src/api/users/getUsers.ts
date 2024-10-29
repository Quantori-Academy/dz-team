import { z } from "zod";

import { $auth } from "stores/auth";

import { base, request } from "../request";

const User = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    role: z.string(),
    lastLoginDate: z.string(),
});

const UsersResponse = z.array(User).optional();
export type UserType = z.infer<typeof User>;

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
