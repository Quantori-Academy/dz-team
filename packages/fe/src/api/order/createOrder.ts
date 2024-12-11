import { z } from "zod";

import { request } from "api/request";
import { OrderCreateWithUserIdInputSchema } from "shared/zodSchemas/order/extendedOrderSchemas";

export type CreateOrderType = z.infer<typeof OrderCreateWithUserIdInputSchema>;

export const createOrder = async (order: CreateOrderType) =>
    await request("/orders", OrderCreateWithUserIdInputSchema, {
        method: "POST",
        json: order,
    });
