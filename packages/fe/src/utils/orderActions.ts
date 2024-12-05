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
        await fetch(`${base}/orders/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        navigate({ to: `/orders/${data.id}` });
    } catch (_error) {
        alert("Failed to update orders. Please try again later.");
    }
};
