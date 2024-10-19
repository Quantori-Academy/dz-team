import { Array, Number, Record, Static, String } from "runtypes";

import { base, request } from "./request";

export const Reagent = Record({
    id: String,
    name: String.nullable(),
    structure: String.nullable(),
    description: String.nullable(),
    quantity: Number,
    unit: String.nullable(),
    size: Number.nullable(),
    expirationDate: String.nullable(),
    storageLocation: String,
    cas: String.nullable(),
    producer: String.nullable(),
    catalogId: String.nullable(),
    catalogLink: String.nullable(),
    pricePerUnit: Number.nullable(),
    createdAt: String.nullable(),
    updatedAt: String.nullable(),
});

export const ReagentsResponse = Array(Reagent).optional();
export type ReagentType = Static<typeof Reagent>;
export type ReagentsResponseType = Static<typeof ReagentsResponse>;

// fetches reagents data and detailed reagent

const searchParams = new URLSearchParams();

export const getReagentsApi = async (page: number, limit: number) => {
    const reagents = await request(`${base}/api/v1/reagents`, ReagentsResponse);
    searchParams.append("_page", page.toString());
    searchParams.append("_limit", limit.toString());
    return reagents;
};
