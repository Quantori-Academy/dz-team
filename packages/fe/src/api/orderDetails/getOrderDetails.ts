import { request } from "api/request";
import { OrderSchema } from "shared/generated/zod/modelSchema";

export const getOrdersDetailsApi = async ({ id }: { id: string }) =>
    await request(`/orders/${id}`, OrderSchema);
