import { sample } from "effector";

import { base } from "api/request";
import { genericDomain as domain } from "logger";
import { Seller } from "shared/generated/zod";

export const $sellers = domain.createStore<Seller[]>([]);

export const fetchSellers = domain.createEvent<void>("fetchSellers");

export const fetchSellersFx = domain.createEffect(async () => {
    const response = await fetch(`${base}/sellers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch sellers");
    }
    const data = await response.json();
    return data;
});

$sellers.on(fetchSellersFx.doneData, (_, sellers) => sellers);

sample({
    clock: fetchSellers,
    target: fetchSellersFx,
});
