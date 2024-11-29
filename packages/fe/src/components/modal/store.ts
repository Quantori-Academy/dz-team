import { genericDomain } from "logger";

export type ModalData = {
    title?: string;
    message: string | React.ReactNode;
    labels?: { ok: string; cancel: string };
};

type StoreType = {
    modal: string | null;
    modalData: ModalData;
};

const initialValue: StoreType = {
    modal: null,
    modalData: {
        title: "",
        message: "",
        labels: { ok: "", cancel: "" },
    },
};

export const showModal = genericDomain.createEvent<StoreType>();
export const buttonClick = genericDomain.createEvent<boolean>();
export const removeModal = genericDomain.createEvent();

export const $modal = genericDomain
    .createStore<StoreType>(initialValue)
    .on(showModal, (_, payload) => ({ ...payload }))
    .on(removeModal, () => initialValue);
