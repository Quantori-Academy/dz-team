import { Array, Number, Record, Static, String } from "runtypes";

import { base, request } from "./request";

const Reagent = Record({
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

const ReagentsResponse = Array(Reagent).optional();
export type ReagentType = Static<typeof Reagent>;

export const getReagentsApi = async () => {
    const reagents = await request(`${base}/api/v1/reagents`, ReagentsResponse);

    return reagents;
};
