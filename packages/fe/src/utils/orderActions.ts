import { toast } from "react-toastify";
import { z } from "zod";

import { request } from "api/request";
import { Order, OrderSchema } from "shared/generated/zod";

export type formData = Pick<
    Order,
    "id" | "title" | "description" | "seller" | "createdAt" | "updatedAt" | "userId" | "status"
>;

// These cannot be considered utility functions, as they are tightly coupled with the application's business logic.
// TODO: rewrite to use `request` and schemas from `shared`, move to `api/reagentDetails`

export const updateOrderAction = async (
    data: formData,
    navigate: (options: { to: string }) => void,
) => {
    try {
        await request(`/orders/${data.id}`, OrderSchema, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            showErrorNotification: true,
        });
        navigate({ to: `/orders/${data.id}` });
    } catch (_err) {
        toast.error("Failed to update the order. Please try again.");
    }
};

export const deleteOrderAction = async (
    id: string,
    navigate: (options: { to: string }) => void,
) => {
    try {
        await request(`/orders/${id}`, z.object({}), {
            method: "DELETE",
            showErrorNotification: true,
        });
        navigate({ to: "/orders" });
    } catch (_err) {
        toast.error("Failed to delete the order. Please try again.");
    }
};
