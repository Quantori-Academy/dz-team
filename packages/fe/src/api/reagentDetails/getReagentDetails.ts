import { request } from "api/request";
import { ReagentSchema } from "shared/generated/zod";

export const getReagentsDetailsApi = async ({ id }: { id: string }) =>
    await request(`/reagents/${id}`, ReagentSchema);
