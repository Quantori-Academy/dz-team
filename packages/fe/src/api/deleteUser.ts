import { z } from "zod";

import { base, request } from "./request";

const UserId = z.object({
    id: z.string().nullable(),
});
export type UserIdType = z.infer<typeof UserId>;

export const deleteUser = async (id: string) => {
    const DeleteUser = await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
    });
    return DeleteUser;
};
