import { genericDomain as domain } from "logger";
import { OrderCreateWithUserIdInputSchema } from "shared/zodSchemas/order/extendedOrderSchemas";
import { $orderData, initialOrderData, setOrderData } from "stores/order";

import { request } from "../request";

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
