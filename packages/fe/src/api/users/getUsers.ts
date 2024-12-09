import { z } from "zod";

import { publicUserSchema } from "shared/zodSchemas/user/publicUserSchema";

import { request } from "../request";

const UsersResponseContract = z.object({
    data: publicUserSchema.array(),
    meta: z.any(),
});

export type UserType = z.infer<typeof publicUserSchema>;

export const getUsers = async () => {
    const Users = await request(`/users`, UsersResponseContract, {
        method: "GET",
    });
    return Users;
};
