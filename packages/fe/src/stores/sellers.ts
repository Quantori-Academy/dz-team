import { sample } from "effector";

import { getSellers } from "api/order/getSellers";
import { genericDomain as domain } from "logger";
import { Seller } from "shared/generated/zod";

export const $sellers = domain.createStore<Seller[]>([]);

export const fetchSellers = domain.createEvent<void>("fetchSellers");

export const fetchSellersFx = domain.createEffect(async () => {
    return await getSellers();
});

$sellers.on(fetchSellersFx.doneData, (_, sellers) => sellers);

sample({
    clock: fetchSellers,
    target: fetchSellersFx,
});
