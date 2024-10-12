import { createEvent, createStore } from "effector";

type StoreType = {
    modal: string | null;
    resolve: ((val: unknown) => void) | null;
};

// Events
export const saveResolve = createEvent<StoreType>();
export const removeResolve = createEvent();

// Store
export const $modal = createStore<StoreType>({ modal: null, resolve: null })
    .on(saveResolve, (_, payload) => ({ ...payload }))
    .on(removeResolve, () => ({ modal: null, resolve: null }));
