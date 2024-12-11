import { request } from "api/request";
import { SampleSchema } from "shared/generated/zod";

export const getSampleDetail = async ({ id }: { id: string }) =>
    await request(`/samples/${id}`, SampleSchema, {
        method: "GET",
    });
