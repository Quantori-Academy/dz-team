import { request } from "api/request";

import { StorageLocationDetailContract } from "./contract";

export const getStorageDetail = async (id: string) => {
    const response = await request(`/storage-locations/${id}`, StorageLocationDetailContract);

    return response;
};
