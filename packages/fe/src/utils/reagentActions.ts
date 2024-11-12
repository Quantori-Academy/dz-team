import { base } from "api/request";
import { deleteReagentEvent, updateReagentEvent } from "stores/reagents";

import { formData } from "../components/pages/app/detailsPage/ReagentForm";

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

export const addReagent = async (data: formData) => {
    try {
        await fetch(`${base}/api/v1/reagents`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch (_error) {
        throw new Error("Failed to add reagent. Please try again.");
    }
};
