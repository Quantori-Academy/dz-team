import { base, request } from "api/request";

import { StorageLocationContract } from "./storageDetail";

export const editStorage = async (data: {
    id: string;
    name: string;
    room: string;
    description: string;
}) => {
    const { id, ...updateData } = data;
    await request(`${base}/api/v1/storage-locations/${id}`, StorageLocationContract, {
        method: "PUT",
        json: updateData,
    });
};
