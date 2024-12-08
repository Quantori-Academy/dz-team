import { OrderStatus } from "stores/order";

import { OrderSchema } from "../../../shared/generated/zod";
import { request } from "./request";

export const changeStatus = async ({ status, id }: { status: OrderStatus; id: string }) => {
    const response = await request(`/orders/${id}/status`, OrderSchema, {
        method: "PATCH",
        json: { status },
    });

    return response;
};
