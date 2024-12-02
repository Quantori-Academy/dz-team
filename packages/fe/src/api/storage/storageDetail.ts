import { base, request } from "api/request";

import { StorageLocationDetailContract } from "./contract";

export const getStorageDetail = async (id: string) => {
    const response = await request(
        `${base}/api/v1/storage-locations/${id}`,
        StorageLocationDetailContract,
    );

    return response;
};
