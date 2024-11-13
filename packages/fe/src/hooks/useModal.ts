import { useCallback } from "react";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";

export type UseModalOptions = {
    name: string;
    title: string;
    message: React.ReactNode;
};

export const useModal = () => {
    const openModal = useCallback(async ({ name, title, message }: UseModalOptions) => {
        try {
            await createModal({
                name,
                title,
                message,
            });
            removeModal();
        } catch (_error) {
            removeModal();
        }
    }, []);

    return { openModal };
};
