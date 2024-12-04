import { sample } from "effector";
import { z } from "zod";

import { request } from "api/request";
import { genericDomain as domain } from "logger";
import { OrderCreateInputSchema } from "shared/generated/zod";

type CreateOrderType = z.infer<typeof OrderCreateInputSchema>;
export const OrderStatus = {
    pending: "pending",
    submitted: "submitted",
    fulfilled: "fulfilled",
    canceled: "canceled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

const initialOrderData = {
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
    // const response = await fetch(`/orders`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(orderData),
    // });
    const response = await request("/orders", OrderCreateInputSchema, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Content-Type": "application/json",
        },
        showErrorNotification: true,
    });

    // if (!response.ok) {
    //     throw new Error("Failed to create order");
    // }

    setOrderData(initialOrderData);
    // return {
    //     ok: response.ok,
    //     status: response.status,
    //     data: await response.json(),
    // };
    // return await response.json();
    return response;
});

sample({
    clock: submitOrder,
    target: submitOrderFx,
});
