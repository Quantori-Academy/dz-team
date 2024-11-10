import { createEvent, createStore } from "effector";

export type LabelsType = {
    ok: string;
    cancel: string;
};

type StoreType = {
    modal: string | null;
    resolve: ((value?: unknown) => void) | null;
    reject: ((reason?: unknown) => void) | null;
    modalData: {
        title: string;
        message: React.ReactNode | ((resolve: () => void, reject: () => void) => React.ReactNode);
        labels: { ok: string; cancel: string };
        hideModalButtons?: boolean;
    };
};

const initialValue: StoreType = {
    modal: null,
    resolve: null,
    reject: null,
    modalData: {
        title: "",
        message: "",
        labels: { ok: "", cancel: "" },
        hideModalButtons: false,
    },
};

// Events
export const saveResolve = createEvent<StoreType>();
export const removeModal = createEvent();

// Store
export const $modal = createStore<StoreType>(initialValue)
    .on(saveResolve, (_, payload) => ({ ...payload }))
    .on(removeModal, () => initialValue);
