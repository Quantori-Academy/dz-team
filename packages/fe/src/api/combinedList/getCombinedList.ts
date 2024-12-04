import { request } from "api/request";
import { combinedListArraySchema } from "shared/generated/zod/modelSchema/CombinedListSchema";

export const getCombinedList = async () => {
    const combinedList = await request(`/list`, combinedListArraySchema, {
        method: "GET",
    });
    return combinedList;
};
