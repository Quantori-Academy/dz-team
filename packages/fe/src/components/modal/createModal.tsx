import { ModalData, saveResolve } from "./store";

type GenericModalDetails = {
    name: string;
} & ModalData;

export function createModal({
    name,
    title,
    message,
    labels,
}: GenericModalDetails): Promise<unknown> {
    return new Promise((resolve, reject) => {
        saveResolve({
            modal: name,
            resolve: resolve as () => void,
            reject,
            modalData: { title, message, labels },
        });
    });
}
