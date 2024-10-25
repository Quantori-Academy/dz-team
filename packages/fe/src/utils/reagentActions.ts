import { base } from "api/request";
import { deleteReagentEvent } from "stores/reagents";

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
