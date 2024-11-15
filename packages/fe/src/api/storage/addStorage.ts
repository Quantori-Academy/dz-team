import { NewStorage } from "hooks/useStorage";

import { base, request } from "../request";
import { StorageLocationTypes } from "./contract";

export const PostStorage = async (storageData: NewStorage) => {
    await request(`${base}/api/v1/storage-locations`, StorageLocationTypes, {
        method: "POST",
        json: storageData,
    });
};
