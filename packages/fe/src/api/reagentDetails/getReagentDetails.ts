import { request } from "api/request";

import { ReagentDetailsContract } from "./contract";

export const getReagentsDetailsApi = async ({ id }: { id: string }) =>
    await request(`/reagents/${id}`, ReagentDetailsContract);
