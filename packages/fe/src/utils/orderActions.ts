import { base } from "api/request";
import { Order } from "shared/generated/zod";

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
        await fetch(`${base}/api/v1/orders/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        navigate({ to: `/orders/${data.id}` });
    } catch (_error) {
        alert("Failed to update orders. Please try again later.");
    }
};

export const updateOrderStatus = async (
    data: { id: string; status: string },
    navigate: (options: { to: string }) => void,
) => {
    try {
        await fetch(`${base}/api/v1/orders/${data.id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: data.status }),
        });
        navigate({ to: `/orders/${data.id}` });
    } catch (_error) {
        alert("Failed to update order status. Please try again later.");
    }
};
