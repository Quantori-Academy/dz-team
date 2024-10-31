import { base, request } from "api/request";

import { OrderDetailsContract } from "./contract";

export const getOrdersDetailsApi = async ({ id }: { id: string }) =>
    await request(`${base}/api/v1/orders/${id}`, OrderDetailsContract);
