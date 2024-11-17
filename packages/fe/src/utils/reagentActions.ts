import { ReagentDetails } from "api/reagentDetails/contract";
import { base } from "api/request";
import { deleteReagentEvent, updateReagentEvent } from "stores/reagents";

// These cannot be considered utility functions, as they are tightly coupled with the application's business logic.
// TODO: rewrite to use `request` and schemas from `shared`, move to `api/reagentDetails`

export type formData = Pick<
    ReagentDetails,
    "id" | "name" | "cas" | "producer" | "pricePerUnit" | "quantity" | "unit" | "storageLocation"
>;

export const deleteReagent = async (id: string, navigate: (options: { to: string }) => void) => {
    try {
        await fetch(`${base}/api/v1/reagents/${id}`, {
            method: "DELETE",
        });
        deleteReagentEvent(id);
        navigate({ to: "/reagents" });
    } catch (_error) {
        alert("Failed to delete reagent. Please try again later.");
    }
};

export const updateReagent = async (
    data: formData,
    navigate: (options: { to: string }) => void,
) => {
    try {
        await fetch(`${base}/api/v1/reagents/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        updateReagentEvent(data);
        navigate({ to: `/reagents/${data.id}` });
    } catch (_error) {
        alert("Failed to update reagent. Please try again later.");
    }
};
