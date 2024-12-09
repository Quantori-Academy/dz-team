import { request } from "../request";
import { StorageLocationContract } from "./contract";

export const deleteStorage = async (id: string) => {
    await request(`/storage-locations/${id}`, StorageLocationContract, {
        method: "DELETE",
    });
};
