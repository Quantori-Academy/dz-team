import { Number, Record, Static, String } from "runtypes";

export const OrderDetailsContract = Record({
    id: String,
    name: String,
    structure: String.nullable(),
    structureImage: String.nullable(),
    cas: String.nullable(),
    producer: String.nullable(),
    catalogId: String.nullable(),
    catalogLink: String.nullable(),
    unit: String,
    pricePerUnit: Number.nullable(),
    quantity: Number,
});

export type OrderDetails = Static<typeof OrderDetailsContract>;
