import { base, request } from "../request";
import { contractStorageType } from "./contract";

export const getStorage = async () => {
    const storage = await request(`${base}/api/v1/storage-locations`, contractStorageType);
    const storageData = storage?.data;
    return storageData;
};
