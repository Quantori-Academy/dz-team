import { createEvent, createStore } from "effector";

type StoreType = {
    modal: string | null;
    resolve: (() => void) | null;
    reject: (() => void) | null;
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
export const removeModal = createEvent();

// Store
export const $modal = createStore<StoreType>(initialValue)
    .on(saveResolve, (_, payload) => ({ ...payload }))
    .on(removeModal, () => initialValue);
