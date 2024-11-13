import { sample } from "effector";
import { createGate } from "effector-react";

import { genericDomain as domain } from "logger";

import { fetchOrdersFx } from "./orderEffects";
import { $OrdersList } from "./orderStore";

export const OrdersGate = createGate({ domain });

sample({
    clock: OrdersGate.open,
    target: fetchOrdersFx,
});

sample({
    clock: fetchOrdersFx.doneData,
    target: $OrdersList,
});
