import { genericDomain } from "logger";

export const incrementLoading = genericDomain.createEvent("incrementLoading");
export const decrementLoading = genericDomain.createEvent("decrementLoading");

const $loadingCount = genericDomain
    .createStore<number>(0, { name: "$loadingCount" })
    .on(incrementLoading, (state) => state + 1)
    .on(decrementLoading, (state) => state - 1);

export const $isLoading = $loadingCount.map((count) => count > 0);
