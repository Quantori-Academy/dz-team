import { useUnit } from "effector-react";

import { Modal } from "./modal/Modal";
import { $modal } from "./modal/store";

export function Hub() {
    const { modal, modalData, resolve, reject } = useUnit($modal);

    return (
        <Modal
            isOpen={!!modal}
            title={modalData.title}
            message={modalData.message}
            labels={modalData.labels}
            resolve={resolve}
            reject={reject}
        />
    );
}
