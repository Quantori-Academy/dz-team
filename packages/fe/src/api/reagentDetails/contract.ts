import { Number, Record, Static, String } from "runtypes";

export const ReagentDetailsContract = Record({
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
    category: String.nullable(),
    status: String.nullable(),
    deletedAt: String.nullable(),
    createdAt: String,
    updatedAt: String,
});

export type ReagentDetails = Static<typeof ReagentDetailsContract>;
