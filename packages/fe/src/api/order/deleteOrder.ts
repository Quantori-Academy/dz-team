import { z } from "zod";

import { request } from "api/request";

export const deleteOrder = async (id: string) =>
    await request(`/orders/${id}`, z.object({}), {
        method: "DELETE",
    });
