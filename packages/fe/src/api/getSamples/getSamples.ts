import { base, request } from "api/request";
import { sampleSchemaContract } from "shared/generated/zod/modelSchema/SampleSchema";

export const getSamples = async () => {
    const samples = await request(`${base}/api/v1/samples`, sampleSchemaContract, {
        method: "GET",
    });

    return samples;
};
