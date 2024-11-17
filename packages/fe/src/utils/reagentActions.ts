import { ReagentDetails } from "api/reagentDetails/contract";
import { base } from "api/request";
import { deleteReagent, updateReagent } from "stores/reagents";

export type formData = Pick<
    ReagentDetails,
    "id" | "name" | "cas" | "producer" | "pricePerUnit" | "quantity" | "unit" | "storageLocation"
>;

// These cannot be considered utility functions, as they are tightly coupled with the application's business logic.
// TODO: rewrite to use `request` and schemas from `shared`, move to `api/reagentDetails`

export const deleteReagentAction = async (
    id: string,
    navigate: (options: { to: string }) => void,
) => {
    try {
        await fetch(`${base}/api/v1/reagents/${id}`, {
            method: "DELETE",
        });
        deleteReagent(id);
        navigate({ to: "/reagents" });
    } catch (_error) {
        alert("Failed to delete reagent. Please try again later.");
    }
};

export const updateReagentAction = async (
    data: formData,
    navigate: (options: { to: string }) => void,
) => {
    try {
        await fetch(`${base}/api/v1/reagents/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        updateReagent(data);
        navigate({ to: `/reagents/${data.id}` });
    } catch (_error) {
        alert("Failed to update reagent. Please try again later.");
    }
};
