import { z } from "zod";

import { base, request } from "../request";

const AddUser = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.string(),
});

//TODO fix types
export type NewUser = z.infer<typeof AddUser>;
export const PostUsers = async (userData: NewUser) => {
    await request(`${base}/api/v1/users`, AddUser, {
        method: "POST",
        json: userData,
    });
};
