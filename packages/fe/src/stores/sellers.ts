import { sample } from "effector";
import { z } from "zod";

import { base } from "api/request";
import { genericDomain as domain } from "logger";
import { SellerCreateInputSchema } from "shared/generated/zod";

type SellersType = z.infer<typeof SellerCreateInputSchema>;
const FetchSellersResponseSchema = z.object({
    data: z.array(SellerCreateInputSchema),
});

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
    const json = await response.json();
    const data = FetchSellersResponseSchema.parse(json);
    return data.data;
});

$sellers.on(fetchSellersFx.doneData, (_, sellers) => sellers);

sample({
    clock: fetchSellers,
    target: fetchSellersFx,
});
