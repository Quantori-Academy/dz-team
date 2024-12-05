import { z } from "zod";

import { base, request } from "../request";

const UserId = z.object({
    message: z.string(),
});

export const deleteUser = async (id: string) => {
    await request(`${base}/api/v1/users/${id}`, UserId, {
        method: "DELETE",
        showErrorNotification: true,
        throwOnError: true,
    });
};
