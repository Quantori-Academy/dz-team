import { sample } from "effector";
import { createGate } from "effector-react";

import { PostStorage } from "api/storage/addStorage";
import { DetailedStorage, StorageType } from "api/storage/contract";
import { deleteStorage } from "api/storage/deleteStorage";
import { getStorage } from "api/storage/getStorage";
import { getStorageDetail } from "api/storage/storageDetail";
import { NewStorage } from "hooks/useStorage";
import { genericDomain as domain } from "logger";

export const fetchStorageFx = domain.createEffect(async () => {
    const response = await getStorage();
    return response ?? [];
});

export const fetchDetailedStorageFx = domain.createEffect(async (id: string) => {
    const response = await getStorageDetail(id);
    return response;
});

export const addStorageFx = domain.createEffect(async (storageData: NewStorage) => {
    const response = await PostStorage(storageData);
    return response;
});

export const deleteStorageFx = domain.createEffect(async (id: string) => {
    return await deleteStorage(id);
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

// triger storage request when new storage is added or deleted
sample({
    clock: [addStorageFx.doneData, deleteStorageFx.doneData],
    target: fetchStorageFx,
});

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
