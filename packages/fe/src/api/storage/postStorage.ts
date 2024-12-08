import { NewStorage } from "api/types";

import { request } from "../request";
import { StorageLocationContract } from "./contract";

export const postStorage = async (storageData: NewStorage) => {
    await request(`/storage-locations`, StorageLocationContract, {
        method: "POST",
        json: storageData,
    });
};
