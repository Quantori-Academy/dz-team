import { base, request } from "../request";
import { StorageLocationDetailContract } from "./contract";

export const deleteStorage = async (id: string) => {
    await request(`${base}/api/v1/storage-locations/${id}`, StorageLocationDetailContract, {
        method: "DELETE",
    });
};
