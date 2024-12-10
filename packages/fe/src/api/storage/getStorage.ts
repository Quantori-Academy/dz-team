import { request } from "api/request";

import { StorageLocationsAllContract } from "./contract";

export const getStorage = async () => {
    const storage = await request(`/storage-locations`, StorageLocationsAllContract, {
        method: "GET",
    });
    return storage;
};
