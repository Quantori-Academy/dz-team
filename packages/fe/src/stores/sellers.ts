import { sample } from "effector";
import { z } from "zod";

import { base } from "api/request";
import { genericDomain as domain } from "logger";
import { SellerCreateInputSchema } from "shared/generated/zod";

type SellersType = z.infer<typeof SellerCreateInputSchema>;

export const $sellers = domain.createStore<SellersType[]>([]);

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return data.data;
});

$sellers.on(fetchSellersFx.doneData, (_, sellers) => sellers);

sample({
    clock: fetchSellers,
    target: fetchSellersFx,
});
