import { sample } from "effector";
import { createGate } from "effector-react";

import { DetailedStorage, StorageType } from "api/storage/contract";
import { getStorage } from "api/storage/getStorage";
import { getStorageDetail } from "api/storage/storageDetail";
import { genericDomain as domain } from "logger";

export const fetchStorageFx = domain.createEffect(async () => {
    const response = await getStorage();
    return response ?? [];
});

export const fetchDetailedStorageFx = domain.createEffect(async (id: string) => {
    const response = await getStorageDetail(id);
    return response;
});

export const $detailedStorage = domain.createStore<DetailedStorage>({} as DetailedStorage, {
    name: "$detailedStorage",
});

export const $storageList = domain.createStore<StorageType["data"]>([], { name: "$storageList" });

export const StorageGate = createGate({ domain });
export const DetailedGate = createGate({ domain });

$detailedStorage.on(fetchDetailedStorageFx.doneData, (_, payload) => payload);

// sample({
//     clock:fetchDetailedStorageFx.doneData,
//     target:$detailedStorage
// })

sample({
    clock: DetailedGate.open,
    source: $detailedStorage,
    filter: (storage) => !!storage.id,
    fn: (storage) => {
        return storage.id;
    },
    target: fetchDetailedStorageFx,
});

sample({
    clock: StorageGate.open,
    target: fetchStorageFx,
});

sample({
    clock: fetchStorageFx.doneData,
    target: $storageList,
});
