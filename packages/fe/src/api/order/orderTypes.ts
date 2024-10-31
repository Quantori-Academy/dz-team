import { Array, Number, Record, Static, String } from "runtypes";

export const _Order = Record({
    id: String,
    userId: String,
    creationDate: String,
    status: String,
    reagents: Array(String),
});

export const OrderList = Record({
    id: String,
    reagentName: String,
    quantity: Number,
    status: String,
    creationDate: String,
});

export const _CreateOrder = Record({
    userId: String,
    reagents: Array(String),
});

export type OrdersType = Static<typeof OrderList>;
export type OrdersTypeCreate = Static<typeof _CreateOrder>;
