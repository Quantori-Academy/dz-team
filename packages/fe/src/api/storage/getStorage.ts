import { base, request } from "../request";
import { contractStorageType } from "./contract";

export const getStorage = async () => {
    const Storage = await request(`${base}/api/v1/storage-locations`, contractStorageType);

    return Storage;
};
