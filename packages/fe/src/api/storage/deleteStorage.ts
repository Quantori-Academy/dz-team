import { base, request } from "../request";
import { StorageLocationTypes } from "./contract";

export const deleteStorage = async (id: string) => {
    await request(`${base}/api/v1/storage-locations/${id}`, StorageLocationTypes, {
        method: "DELETE",
    });
};
