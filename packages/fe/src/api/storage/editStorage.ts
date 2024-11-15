import { base, request } from "api/request";

import { StorageLocationTypes } from "./contract";

export const editStorage = async (data: {
    id: string;
    name: string;
    room: string;
    description: string;
}) => {
    const { id, ...updateData } = data;
    await request(`${base}/api/v1/storage-locations/${id}`, StorageLocationTypes, {
        method: "PUT",
        json: updateData,
    });
};
