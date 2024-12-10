import { request } from "api/request";
import { OrderSchema } from "shared/generated/zod";

export const fulfillOrder = (
    orderId: string,
    reagentsAndStorageIds: { id: string; storageId: string }[],
) => {
    return request(`/orders/${orderId}/fulfill`, OrderSchema, {
        method: "PATCH",
        json: {
            reagents: reagentsAndStorageIds,
        },
    });
};
