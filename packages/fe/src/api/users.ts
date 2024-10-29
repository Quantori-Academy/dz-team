import { z } from "zod";

import { base, request } from "./request";

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

export const getUsers = async () => {
    const Users = await request(`${base}/api/v1/users`, UsersResponse);
    return Users;
};
