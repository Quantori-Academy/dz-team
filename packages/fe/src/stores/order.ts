import { sample } from "effector";

import { createOrder, CreateOrderType } from "api/order/createOrder";
import { genericDomain as domain } from "logger";

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

export const submitOrderFx = domain.createEffect(async () => {
    const orderData = $orderData.getState();
    const response = await createOrder(orderData);
    setOrderData(initialOrderData);
    return response;
});

sample({
    clock: submitOrder,
    target: submitOrderFx,
});
