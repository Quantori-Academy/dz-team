import { sample } from "effector";
import { z } from "zod";

import { submitOrderFx } from "api/order/postOrder";
import { genericDomain as domain } from "logger";
import { OrderCreateWithUserIdInputSchema } from "shared/zodSchemas/order/extendedOrderSchemas";

type CreateOrderType = z.infer<typeof OrderCreateWithUserIdInputSchema>;
export const OrderStatus = {
    pending: "pending",
    submitted: "submitted",
    fulfilled: "fulfilled",
    canceled: "canceled",
} as const;

type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const initialOrderData: CreateOrderType = {
    title: "",
    seller: "",
    userId: "",
    description: "",
    status: OrderStatus.pending,
    reagents: [],
};

export const $orderData = domain.createStore<CreateOrderType>(initialOrderData);
export const setOrderData = domain.createEvent<CreateOrderType>();
export const submitOrder = domain.createEvent<void>("submitOrder");

$orderData.on(setOrderData, (state, payload) => ({
    ...state,
    ...payload,
}));

sample({
    clock: submitOrder,
    target: submitOrderFx,
});
