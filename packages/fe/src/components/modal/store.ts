import { createEvent, createStore } from "effector";

type StoreType = {
    modal: string | null;
    resolve: (value?: unknown) => void | null;
    reject: (reason?: unknown) => void | null;
    modalData: {
        title: string;
        message: string | React.ReactNode;
        labels: [{ ok: string }, { cancel: string }];
    };
};

const initialValue: StoreType = {
    modal: null,
    resolve: null,
    reject: null,
    modalData: {
        title: "",
        message: "",
        labels: [{ ok: "" }, { cancel: "" }],
    },
};

// Events
export const saveResolve = createEvent<StoreType>();
export const removeResolve = createEvent();

// Store
export const $modal = createStore<StoreType>(initialValue)
    .on(saveResolve, (_, payload) => ({ ...payload }))
    .on(removeResolve, () => initialValue);
