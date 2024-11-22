import { sample } from "effector";

import { postStorage } from "api/storage/addStorage";
import { NewStorage } from "hooks/useStorage";
import { genericDomain as domain } from "logger";

export const addStorageFx = domain.createEffect(async (storageData: NewStorage) => {
    return await postStorage(storageData);
});

export const updateStorageList = domain.createEvent<void>("updateStorageList");

// Trigger updateStorageList after adding a new storage item
sample({
    clock: addStorageFx.doneData,
    target: updateStorageList,
});
