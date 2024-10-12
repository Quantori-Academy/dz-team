export const api = {
    ReagentsMaterials: {
        // fetches whole reagents data from base
        all: async (page: number = 1, limit: number = 5) => {
            const url = new URL("http://0.0.0.0:1337/api/v1/reagents");
            url.searchParams.append("page", String(page));
            url.searchParams.append("limit", String(limit));

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error("Failed to fetch materials");
            }
            return response.json();
        },
        // fetches detailed information about single reagent
        get: async (id) => {
            const response = await fetch(`http://0.0.0.0:1337/api/v1/reagents/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch material");
            }
            return response.json();
        },
    },
};
