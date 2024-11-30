import { base, request } from "api/request";

import { ReagentRequestDetailsContract } from "./contract";

export const getReagentRequestDetailsApi = async ({ id }: { id: string }) =>
    await request(`${base}/api/v1/reagent-request/${id}`, ReagentRequestDetailsContract);
