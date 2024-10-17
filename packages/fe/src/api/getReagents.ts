import { ReagentsResponse } from "./reagents";
import { base, request } from "./request";

// fetches reagents data and detailed reagent

const searchParams = new URLSearchParams();

export const getReagentsApi = async (
    page: number,
    limit: number,
    sort: string | null,
    filter: string | null,
) => {
    const reagents = await request(`${base}/api/v1/reagents`, ReagentsResponse);
    searchParams.append("_page", String(page));
    searchParams.append("_limit", String(limit));
    if (sort) {
        searchParams.append("_sort", sort);
    }
    if (filter) {
        searchParams.append("name", filter);
    }
    return reagents;
};
