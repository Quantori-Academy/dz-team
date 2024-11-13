import { base, request } from "api/request";

import { OrdersResponse } from "./orderConstants";

export const getOrders = async () => {
    const Orders = await request(`${base}/api/v1/orders`, OrdersResponse);
    return Orders;
};
