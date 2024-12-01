import { buttonClick, ModalData, removeModal, showModal } from "./store";

type GenericModalDetails = {
    name: string;
} & ModalData;

export function createModal({
    name,
    title,
    message,
    labels,
}: GenericModalDetails): Promise<unknown> {
    return new Promise((resolve) => {
        const unwatch = buttonClick.watch((response) => {
            unwatch();
            resolve(response);
            removeModal();
        });

        showModal({
            modal: name,
            modalData: { title, message, labels },
        });
    });
}
