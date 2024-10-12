import { saveResolve } from "./store";

export function createModal(): Promise<unknown> {
    return new Promise((resolve) => {
        saveResolve({ modal: "some_id", resolve });
    });
}
