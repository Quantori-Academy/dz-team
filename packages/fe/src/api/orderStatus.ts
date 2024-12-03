import { OrderStatus } from "stores/order";

import { OrderSchema } from "../../../shared/generated/zod";
import { request } from "./request";

export const setStatus = async ({ status, id }: { status: OrderStatus; id: string }) => {
    const response = await request(`/orders/${id}/status`, OrderSchema, {
        method: "PATCH",
        json: { status: status },
        showErrorNotification: true,
        shouldAffectIsLoading: true,
    });

    if (!response) throw new Error("Failed to set status");
    return response;
};
