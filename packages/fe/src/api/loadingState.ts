import { createEvent, createStore } from "effector";

export const incrementLoading = createEvent();
export const decrementLoading = createEvent();

const $loadingCount = createStore<number>(0)
    .on(incrementLoading, (state) => state + 1)
    .on(decrementLoading, (state) => state - 1);

export const $isLoading = $loadingCount.map((count) => count > 0);
