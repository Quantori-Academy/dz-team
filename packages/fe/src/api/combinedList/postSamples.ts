import { request } from "api/request";
import { SampleData } from "api/types";
import SampleSchema from "shared/generated/zod/modelSchema/SampleSchema";

export const postSamples = async (formdata: SampleData) => {
    await request(`/samples`, SampleSchema, {
        method: "POST",
        json: formdata,
    });
};
