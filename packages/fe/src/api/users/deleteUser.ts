import { z } from "zod";

import { request } from "../request";

const UserId = z.object({
    message: z.string(),
});

export const deleteUser = async (id: string) => {
    await request(`/users/${id}`, UserId, {
        method: "DELETE",
    });
};
