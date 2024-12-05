import { request } from "api/request";
import { ReagentRequestSchema } from "shared/generated/zod";

export const getReagentRequestDetailsApi = async ({ id }: { id: string }) =>
    await request(`/requests/${id}`, ReagentRequestSchema);
