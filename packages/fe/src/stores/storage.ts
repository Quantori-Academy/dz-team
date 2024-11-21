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
    return await postStorage(storageData);
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

sample({
    clock: StorageGate.open,
    target: fetchStorageFx,
});

// Update storage list  after fetch
sample({
    clock: fetchStorageFx.doneData,
    target: $storageList,
});

// Trigger fetch when storage  after add, edit and delete
sample({
    clock: [
        addStorageFx.doneData,
        deleteStorageFx.doneData,
        editStorageFx.doneData,
        updateStorageList,
    ],
    target: fetchStorageFx,
});

// Trigger updateStorageList after adding a new storage item
sample({
    clock: addStorageFx.doneData,
    target: updateStorageList,
});
