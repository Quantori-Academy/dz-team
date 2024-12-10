import { createEvent } from "effector";

import { StorageLocationDetailContractType } from "api/storage/contract";
import { genericDomain as domain } from "logger";
// Events
export const updateStorage = domain.createEvent<StorageLocationDetailContractType>();
export const deleteStorageById = createEvent<string>();

// Store
export const $storageDetails = domain
    .createStore<StorageLocationDetailContractType | null>(null)
    .on(updateStorage, (_, updatedStorage) => updatedStorage)
    .on(deleteStorageById, (state, id) => (state?.id === id ? null : state));
