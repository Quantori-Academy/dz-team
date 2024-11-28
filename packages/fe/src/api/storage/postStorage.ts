import { NewStorage } from "api/types";

import { base, request } from "../request";
import { StorageLocationContract } from "./contract";

export const postStorage = async (storageData: NewStorage) => {
    await request(`${base}/api/v1/storage-locations`, StorageLocationContract, {
        method: "POST",
        json: storageData,
    });
};
