import { request } from "../request";
import { SampleCreateSchema } from "./getSampleDetail";

export const deleteSample = async (id: string) => {
    await request(`/samples/${id}`, SampleCreateSchema, {
        method: "DELETE",
    });
};
