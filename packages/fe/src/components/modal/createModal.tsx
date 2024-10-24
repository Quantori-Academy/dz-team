import { saveResolve } from "./store";

type GenericModalDetails = {
    name: string;
    title: string;
    message: string | React.ReactNode;
    labels: [{ ok: string }, { cancel: string }];
};

export function createModal({
    name,
    title,
    message,
    labels,
}: GenericModalDetails): Promise<unknown> {
    return new Promise((resolve, reject) => {
        saveResolve({ modal: name, resolve, reject, modalData: { title, message, labels } });
    });
}
