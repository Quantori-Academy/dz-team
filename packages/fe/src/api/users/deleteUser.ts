import { z } from "zod";

import { base, request } from "../request";

const UserId = z.object({
    id: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    lastLoginDate: z.string().optional(),
    username: z.string().optional(),
});
export type UserIdType = z.infer<typeof UserId>;

export const deleteUser = async (id: string) => {
    await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
    });
};
