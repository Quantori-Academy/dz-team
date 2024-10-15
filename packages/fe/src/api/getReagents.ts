import {
    base,
    Reagent,
    ReagentsResponse,
    ReagentsResponseType,
    ReagentType,
    request,
} from "./request";
// fetches reagents data and detailed reagent
export const getReagentsApi = {
    ReagentsMaterials: {
        all: async (page: number, limit: number, sort: string, filter: string | null) => {
            const url = new URL(`${base}/api/v1/reagents`);
            url.searchParams.append("_page", String(page));
            url.searchParams.append("_limit", String(limit));
            if (sort) {
                url.searchParams.append("_sort", sort);
            }
            if (filter) {
                url.searchParams.append("name", filter);
            }

            // eslint-disable-next-line no-useless-catch
            try {
                const data: ReagentsResponseType = await request(url.toString(), ReagentsResponse, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    showErrorNotification: true,
                    shouldAffectIsLoading: true,
                    throwOnError: true,
                });

                return data;
            } catch (error) {
                throw error;
            }
        },
        get: async (id: string) => {
            const url = new URL(`${base}/v1/reagents/${id}`);

            // eslint-disable-next-line no-useless-catch
            try {
                const data: ReagentType = await request(url.toString(), Reagent, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    showErrorNotification: true,
                    shouldAffectIsLoading: true,
                    throwOnError: true,
                });

                return data;
            } catch (error) {
                throw error;
            }
        },
    },
};
