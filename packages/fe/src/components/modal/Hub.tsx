import { useUnit } from "effector-react";

import { Modal } from "./Modal";
import { $modal } from "./store";

export function Hub() {
    const { modal, modalData } = useUnit($modal);

    if (modal && modalData) {
        return (
            <Modal
                isOpen={!!modal}
                title={modalData.title}
                message={modalData.message}
                labels={modalData.labels}
            />
        );
    }
}
