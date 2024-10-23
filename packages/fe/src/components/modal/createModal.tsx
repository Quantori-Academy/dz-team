import { saveResolve } from "./store";

interface IGenericModalProps {
    title: string;
    message: string | React.ReactNode;
    labels: [{ ok: string }, { cancel: string }];
}

export function createModal({ title, message, labels }: IGenericModalProps): Promise<unknown> {
    return new Promise((resolve, reject) => {
        saveResolve({ modal: "some_id", resolve, reject, modalData: { title, message, labels } });
    });
}
