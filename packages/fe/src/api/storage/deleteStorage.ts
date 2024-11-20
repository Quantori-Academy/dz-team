import { base, request } from "../request";
import { StorageLocationContract } from "./contract";

export const deleteStorage = async (id: string) => {
    await request(`${base}/api/v1/storage-locations/${id}`, StorageLocationContract, {
        method: "DELETE",
    });
};
