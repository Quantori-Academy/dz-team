import { api, base } from "./request";

export const getReagentsApi = {
    ReagentsMaterials: {
        all: async (page: number, limit: number, sort: string, filter: string | null) => {
            const searchParams = new URLSearchParams({
                _page: String(page),
                _limit: String(limit),
                _sort: sort,
                name: filter ?? "",
            });

            const response = await api.get(`${base}api/v1/reagents?${searchParams}`);
            if (!response.ok) {
                throw new Error("Failed to fetch materials");
            }
            return await response.json();
        },
        // Method to fetch detailed information about a single reagent
        get: async (id: string) => {
            const response = await api.get(`${base}api/v1/reagents/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch material");
            }
            return await response.json();
        },
    },
};
