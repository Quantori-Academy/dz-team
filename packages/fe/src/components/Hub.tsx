import { useUnit } from "effector-react";

import { Modal } from "./modal/Modal";
import { $modal } from "./modal/store";

export function Hub() {
    const { modal, resolve } = useUnit($modal);

    // logging into console to track how the state is changing
    // console.log({ modal, resolve });

    return <Modal isOpen={modal !== null} onClose={resolve} />;
}
