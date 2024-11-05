import { base, request } from "../request";
import { ApiStorageType } from "./contract";

export const getStorage = async () => {
    const Storage = await request(`${base}/api/v1/storage-locations`, ApiStorageType);

    return Storage;
};
