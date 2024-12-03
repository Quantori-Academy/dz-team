import { ReagentDetails } from "api/reagentDetails/contract";

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
        await fetch(`/reagents/${id}`, {
            method: "DELETE",
        });
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
        await fetch(`/reagents/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        navigate({ to: `/reagents/${data.id}` });
    } catch (_error) {
        alert("Failed to update reagent. Please try again later.");
    }
};
