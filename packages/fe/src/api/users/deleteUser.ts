import { z } from "zod";

import { $auth, Auth } from "stores/auth";

import { base, request } from "../request";

const UserId = z.object({
    id: z.string().nullable(),
});
export type UserIdType = z.infer<typeof UserId>;

const token = ($auth.getState() as Auth | null)?.token ?? "";
export const deleteUser = async (id: string) => {
    await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
