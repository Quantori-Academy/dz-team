import { Array, Number, Record, Static, String } from "runtypes";
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
