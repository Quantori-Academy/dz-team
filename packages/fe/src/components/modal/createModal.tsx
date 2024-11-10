import { LabelsType, saveResolve } from "./store";

type GenericModalDetails = {
    name: string;
    title: string;
    message: React.ReactNode | ((resolve: () => void, reject: () => void) => React.ReactNode);
    labels: LabelsType;
    hideModalButtons?: boolean;
};

export function createModal({
    name,
    title,
    message,
    labels,
    hideModalButtons,
}: GenericModalDetails): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
        const resolveWrapper = () => resolve();
        const rejectWrapper = () => reject(new Error("Modal closed without action"));

        saveResolve({
            modal: name,
            resolve: resolve as (value?: unknown) => void,
            reject: reject as (reason?: unknown) => void,
            modalData: {
                title,
                message:
                    typeof message === "function"
                        ? message(resolveWrapper, rejectWrapper)
                        : message,
                labels,
                hideModalButtons,
            },
        });
    });
}
