import { z } from "zod";

import { $auth } from "stores/auth";

import { base, request } from "../request";

const UserId = z.object({
    id: z.string().nullable(),
});
export type UserIdType = z.infer<typeof UserId>;

export const deleteUser = async (id: string) => {
    const auth = $auth.getState();
    const token = auth !== false ? auth?.token : null;
    await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
