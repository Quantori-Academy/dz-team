import { z } from "zod";

import { base, request } from "../request";

const User = z.object({
    id: z.string(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string().nullable(),
    role: z.string().nullable(),
    lastLoginDate: z.string().nullable(),
    username: z.string().nullable(),
});

const UsersResponse = z.array(User).optional();
export type UserType = z.infer<typeof User>;

export const getUsers = async () => {
    const Users = await request(`${base}/api/v1/users`, UsersResponse, {
        method: "GET",
    });

    return Users;
};
