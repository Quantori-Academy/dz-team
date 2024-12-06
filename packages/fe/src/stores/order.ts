import { sample } from "effector";
import { z } from "zod";

import { request } from "api/request";
import { genericDomain as domain } from "logger";
import { OrderCreateWithUserIdInputSchema } from "shared/zodSchemas/order/extendedOrderSchemas";

type CreateOrderType = z.infer<typeof OrderCreateWithUserIdInputSchema>;
export const OrderStatus = {
    pending: "pending",
    submitted: "submitted",
    fulfilled: "fulfilled",
    canceled: "canceled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

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

export const submitOrderFx = domain.createEffect(async () => {
    const orderData = $orderData.getState();
    const response = await request("/orders", OrderCreateWithUserIdInputSchema, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Content-Type": "application/json",
        },
        showErrorNotification: true,
    });
    setOrderData(initialOrderData);
    return response;
});

sample({
    clock: submitOrder,
    target: submitOrderFx,
});
