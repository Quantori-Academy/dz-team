import { base, request } from "api/request";
import { SampleData } from "api/types";
import CombinedListSchema from "shared/generated/zod/modelSchema/CombinedListSchema";

export const postSamples = async (formdata: SampleData) => {
    await request(`${base}/api/v1/samples`, CombinedListSchema, {
        method: "POST",
        json: formdata,
    });
};
