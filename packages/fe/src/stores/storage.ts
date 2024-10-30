import { createEffect, sample } from "effector";
import { createGate } from "effector-react";

import { getStorage } from "api/storage/getStorage";
import { genericDomain as domain } from "logger";

export const fetchStorageFx = createEffect(async () => {
    const response = await getStorage();
    return response ?? [];
});

export const $StorageList = domain.createStore<unknown>([], { name: "$StorageList" });

export const StorageGate = createGate({ domain });

sample({
    clock: StorageGate.open,
    target: fetchStorageFx,
});

sample({
    clock: fetchStorageFx.doneData,
    target: $StorageList,
});
