import { base, request } from "api/request";

import { StorageLocationDetailContract } from "./contract";

export const editStorage = async (data: {
    id: string;
    name: string;
    room: string;
    description?: string | null | undefined;
}) => {
    const { id, name, room, description } = data;
    const updateData = { name, room, description };

    await request(`${base}/api/v1/storage-locations/${id}`, StorageLocationDetailContract, {
        method: "PUT",
        json: updateData,
    });
};
