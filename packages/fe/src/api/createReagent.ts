import { z } from "zod";

import { ReagentCreateInputSchema } from "shared/generated/zod";

import { request } from "./request";

export const createReagent = async (formData: z.infer<typeof ReagentCreateInputSchema>) => {
    const response = await request(`/reagents`, ReagentCreateInputSchema, {
        method: "POST",
        json: formData,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};
