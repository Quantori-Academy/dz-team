import { createEffect, sample } from "effector";
import { createGate } from "effector-react";

import { DetailedStorage, StorageType } from "api/storage/contract";
import { getStorage } from "api/storage/getStorage";
import { getStorageDetail } from "api/storage/storageDetail";
import { genericDomain as domain } from "logger";

export const fetchStorageFx = createEffect(async () => {
    const response = await getStorage();
    return response ?? [];
});

// TODO emove unknown
export const fetchDetailedStorageFx = createEffect(async (id: unknown) => {
    const response = await getStorageDetail({ id });
    return response;
});

export const $DetailedStorage = domain.createStore<DetailedStorage>({} as DetailedStorage, {
    name: "$DetailedStorage",
});

export const $StorageList = domain.createStore<StorageType>([], { name: "$StorageList" });

export const StorageGate = createGate({ domain });
export const DetailedGate = createGate({ domain });

$DetailedStorage.on(fetchDetailedStorageFx.doneData, (_, payload) => payload);

sample({
    clock: DetailedGate.open,
    target: fetchDetailedStorageFx,
});

// sample({
//     clock: fetchDetailedStorageFx.doneData,
//     target: $DetailedStorage,
// });

sample({
    clock: StorageGate.open,
    target: fetchStorageFx,
});

sample({
    clock: fetchStorageFx.doneData,
    target: $StorageList,
});
