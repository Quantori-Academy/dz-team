import { Array } from "runtypes";

import { OrderList } from "./orderTypes";

export const OrdersResponse = Array(OrderList).optional();
