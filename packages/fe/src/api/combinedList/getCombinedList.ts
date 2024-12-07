import { z } from "zod";

import { request } from "api/request";
import CombinedListSchema from "shared/generated/zod/modelSchema/CombinedListSchema";

const combinedListArraySchema = z.object({
    data: z.array(CombinedListSchema),
});

export const getCombinedList = async () => {
    const combinedList = await request(`/list`, combinedListArraySchema, {
        method: "GET",
    });
    return combinedList;
};
