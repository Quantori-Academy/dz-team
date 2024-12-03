import { request } from "api/request";

import { StorageLocationContract } from "./contract";

export const editStorage = async (data: {
    id: string;
    name: string;
    room: string;
    description?: string | null | undefined;
}) => {
    const { id, ...updateData } = data;

    await request(`/storage-locations/${id}`, StorageLocationContract, {
        method: "PUT",
        json: updateData,
    });
};
