import { base, request } from "api/request";

import { StorageLocationTypes } from "./contract";

// for hard coded id "2ecb0dc1-1cc6-44c8-93e3-ff1646ebadca" use instead of id in request for mockdata

export const getStorageDetail = async (id: string) => {
    const response = await request(`${base}/api/v1/storage-locations/${id}`, StorageLocationTypes, {
        method: "Get",
    });

    return response;
};
