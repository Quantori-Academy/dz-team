export const api = {
    ReagentsMaterials: {
        // fetches whole reagents data from base
        all: async () => {
            const response = await fetch("http://0.0.0.0:1337/api/v1/reagents");
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
