import { request } from "api/request";
import { Order, OrderSchema } from "shared/generated/zod";

export type formData = Pick<
    Order,
    "id" | "title" | "description" | "seller" | "createdAt" | "updatedAt" | "userId" | "status"
>;

export const updateOrder = async (data: formData) =>
    await request(`/orders/${data.id}`, OrderSchema, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        showErrorNotification: true,
    });
