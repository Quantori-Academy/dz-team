import { sample } from "effector";

import { postStorage } from "api/storage/addStorage";
import { NewStorage } from "hooks/useStorage";
import { genericDomain as domain } from "logger";

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

sample({
    clock: updateStorageList,
    source: $formData,
    fn: (data) => data,
    target: addStorageFx,
});