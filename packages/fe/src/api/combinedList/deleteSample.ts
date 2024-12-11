import { SampleSchema } from "shared/generated/zod";

import { request } from "../request";

export const deleteSample = async (id: string) => {
    await request(`/samples/${id}`, SampleSchema, {
        method: "DELETE",
    });
};
