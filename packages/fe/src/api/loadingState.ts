import { createDomain } from "effector";

const loadingDomain = createDomain();

export const incrementLoading = loadingDomain.createEvent();
export const decrementLoading = loadingDomain.createEvent();

const $loadingCount = loadingDomain
    .createStore<number>(0)
    .on(incrementLoading, (state) => state + 1)
    .on(decrementLoading, (state) => state - 1);

export const $isLoading = $loadingCount.map((count) => count > 0);
