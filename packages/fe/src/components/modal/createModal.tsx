import { buttonClick, ModalData, removeModal, showModal } from "./store";

type GenericModalDetails = {
    name: string;
} & ModalData;

export function createModal({
    name,
    title,
    message,
    labels,
}: GenericModalDetails): Promise<boolean> {
    return new Promise((resolve) => {
        showModal({
            modal: name,
            modalData: { title, message, labels },
        });

        const unwatch = buttonClick.watch((response) => {
            removeModal();
            resolve(response);
        });

        removeModal.watch(() => {
            unwatch();
        });

        showModal.watch(() => {
            unwatch();
        });
    });
}
