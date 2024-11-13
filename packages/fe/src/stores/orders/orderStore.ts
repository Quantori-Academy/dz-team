import { createEvent } from "effector";

import { OrdersType } from "api/order/orderTypes";
import { genericDomain as domain } from "logger";

export const $OrdersList = domain.createStore<OrdersType[]>([], { name: "$OrderList" });
export const deleteOrderEvent = createEvent<string>();

$OrdersList.on(deleteOrderEvent, (state, id) => state.filter((order) => order.id !== id));
