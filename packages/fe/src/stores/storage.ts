import { sample } from "effector";
import { createGate } from "effector-react";

import { StorageLocation } from "api/storage/contract";
import { getStorage } from "api/storage/getStorage";
import { genericDomain as domain } from "logger";

export const $storageList = domain.createStore<StorageLocation[]>([], { name: "$storageList" });

export const fetchStorageFx = domain.createEffect(async () => {
    const response = await getStorage();
    return response?.data ?? [];
});

export const StorageGate = createGate({ domain });

sample({
    clock: StorageGate.open,
    target: fetchStorageFx,
});

sample({
    clock: fetchStorageFx.doneData,
    target: $storageList,
});
