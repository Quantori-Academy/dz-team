export const api = {
    ReagentsMaterials: {
        // fetches whole reagents data from base
        all: async (page: number, limit: number, sort: string, filter: string | null) => {
            const url = new URL("http://0.0.0.0:1337/api/v1/reagents");
            url.searchParams.append("_page", String(page));
            url.searchParams.append("_limit", String(limit));
            if (sort) {
                url.searchParams.append("_sort", sort);
            }
            if (filter) {
                url.searchParams.append("name", filter);
            }

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error("Failed to fetch materials");
            }
            return response.json();
        },
        // fetches detailed information about single reagent
        get: async (id: string) => {
            const response = await fetch(`http://0.0.0.0:1337/api/v1/reagents/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch material");
            }
            return response.json();
        },
    },
};
