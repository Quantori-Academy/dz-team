import { sample } from "effector";
import { createGate } from "effector-react";

import { postStorage } from "api/storage/addStorage";
import { StorageType } from "api/storage/contract";
import { deleteStorage } from "api/storage/deleteStorage";
import { editStorage } from "api/storage/editStorage";
import { getStorage } from "api/storage/getStorage";
import { NewStorage } from "hooks/useStorage";
import { genericDomain as domain } from "logger";

export const fetchStorageFx = domain.createEffect(async () => {
    const response = await getStorage();
    return response ?? [];
});

export const addStorageFx = domain.createEffect(async (storageData: NewStorage) => {
    const response = await postStorage(storageData);
    return response;
});

export const deleteStorageFx = domain.createEffect(async (id: string) => {
    return await deleteStorage(id);
});

export const editStorageFx = domain.createEffect(
    async (data: { id: string; name: string; room: string; description: string }) => {
        return await editStorage(data);
    },
);
export const updateStorageList = domain.createEvent<void>("updateStorageList");
export const $storageList = domain.createStore<StorageType["data"]>([], { name: "$storageList" });

export const StorageGate = createGate({ domain });

// triger storage request when new storage is added,  deleted or edited
sample({
    clock: [addStorageFx.doneData, deleteStorageFx.doneData, editStorageFx],
    target: fetchStorageFx,
});

sample({
    clock: StorageGate.open,
    target: fetchStorageFx,
});

sample({
    clock: fetchStorageFx.doneData,
    target: $storageList,
});
