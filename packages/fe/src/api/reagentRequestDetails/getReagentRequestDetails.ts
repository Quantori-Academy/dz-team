import { request } from "api/request";

import { RequestUpdateBodySchema } from "../../../../shared/zodSchemas/request/requestSchemas";

export const getReagentRequestDetailsApi = async ({ id }: { id: string }) =>
    await request(`/requests/${id}`, RequestUpdateBodySchema);
