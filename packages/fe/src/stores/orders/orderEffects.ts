import { createEffect } from "effector";

import { getOrders } from "api/order/orderApi";
import { OrdersType } from "api/order/orderTypes";

export const fetchOrdersFx = createEffect(async (): Promise<OrdersType[]> => {
    const response = await getOrders();
    return response ?? [];
});
