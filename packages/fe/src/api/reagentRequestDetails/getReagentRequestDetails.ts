import { request } from "api/request";

import { ReagentRequestDetailsContract } from "./contract";

export const getReagentRequestDetailsApi = async ({ id }: { id: string }) =>
    await request(`/reagent-request/${id}`, ReagentRequestDetailsContract);
