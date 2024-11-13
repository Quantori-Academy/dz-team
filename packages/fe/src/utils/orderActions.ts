import { base } from "api/request";
import { deleteOrderEvent } from "stores/orders/orderStore";

export const deleteOrder = async (id: string, navigate: (options: { to: string }) => void) => {
    try {
        await fetch(`${base}/api/v1/orders/${id}`, {
            method: "DELETE",
        });
        deleteOrderEvent(id);
        navigate({ to: "/orders" });
    } catch (_error) {
        alert("Failed to delete order. Please try again later.");
    }
};
