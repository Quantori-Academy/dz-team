import { base, request } from "api/request";

import { ReagentDetailsContract } from "./contract";

export const getReagentsDetailsApi = async ({ id }: { id: string }) =>
    await request(`${base}/api/v1/reagents/${id}`, ReagentDetailsContract);
