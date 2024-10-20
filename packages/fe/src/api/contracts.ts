import * as rt from "runtypes";

export const ReagentContract = rt.Record({
    id: rt.Number,
    name: rt.String,
    category: rt.String,
    description: rt.String,
    casNumber: rt.String,
    producer: rt.String,
    catalogId: rt.String,
    catalogLink: rt.String,
    pricePerUnit: rt.Number,
    quantity: rt.Number,
    units: rt.String,
});
