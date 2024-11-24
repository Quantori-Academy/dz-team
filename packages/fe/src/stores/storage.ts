import { sample } from "effector";
import { createGate } from "effector-react";

import { postStorage } from "api/storage/addStorage";
import { getStorage } from "api/storage/getStorage";
import { updateStorage } from "api/storage/updateStorage";
import { NewStorage } from "hooks/useStorage";
import { genericDomain as domain } from "logger";
import { StorageLocation } from "shared/generated/zod";

export const fetchStorageFx = domain.createEffect(async () => {
    const response = await getStorage();

    return response ?? [];
});

export const $storageList = domain.createStore<StorageLocation[]>([], { name: "storageList" });

export const setStoreId = domain.createEvent<string>();
export const resetStoreId = domain.createEvent();

export const setStorageRoomId = domain.createEvent<string>();

export const $storeReagentId = domain
    .createStore<string | null>(null)
    .on(setStoreId, (_, newStoreId) => newStoreId)
    .reset(resetStoreId);

export const $selectedStorageRoomId = domain
    .createStore<string | null>(null, { name: "selectedStorageRoomId" })
    .on(setStorageRoomId, (_, id) => id);

export const StorageGate = createGate({ domain });
export const StorageIdGate = createGate({ domain });

// sample({
//     clock: StorageIdGate.open,
//     target: setStorageRoomId,
// });

sample({
    clock: StorageGate.open,
    target: fetchStorageFx,
});

// sample({
//     clock: fetchStorageFx.doneData,
//     target: $storageList,
// });

export const moveReagentsToStorageFx = domain.createEffect(
    async ({ reagentIds, storageRoomId }: { reagentIds: string; storageRoomId: string }) => {
        const response = await updateStorage({ reagentIds, storageRoomId });

        return response;
    },
);

// sample({
//     clock: [setStoreId, setStorageRoomId],
//     source: { reagentIds: $storeReagentId, storageRoomId: $selectedStorageRoomId },
//     filter: ({ reagentIds, storageRoomId }: any) => reagentIds.length > 0 && !!storageRoomId,
//     target: moveReagentsToStorageFx,
// });

// export const $storeIds = domain
//     .createStore<string[]>([])
//     .on(addStoreId, (state, newId) => {
//         if (!state.includes(newId)) {
//             return [...state, newId];
//         }
//         return state;
//     })
//     // .on(removeStoreId, (state, idToRemove) => {
//     //     return state.filter((id) => id !== idToRemove);
//     // })
//     .reset(resetStoreId);

const initialData: NewStorage = {
    name: "",
    room: "",
    description: "",
};

export const $formData = domain.createStore<NewStorage>(initialData);
export const setFormData = domain.createEvent<NewStorage>();

export const updateStorageList = domain.createEvent<void>("updateStorageList");

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

export const addStorageFx = domain.createEffect(async () => {
    const data = $formData.getState();

    return await postStorage(data);
});

// updateStorageList.watch(() => {
//     console.log("updateStorageList event triggered.");
// });
// $formData.watch((state) => console.log("Updated $formData:", state));
// setFormData.watch((payload) => console.log("setFormData event triggered with payload:", payload));

sample({
    clock: updateStorageList,
    source: $formData,
    fn: (data) => data,
    target: addStorageFx,
});
