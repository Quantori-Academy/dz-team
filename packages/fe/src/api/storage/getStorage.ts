import { search } from "api/search";
import { StorageLocationSchema } from "shared/generated/zod";

export const getStorage = async (query = "") => {
    const storage = await search({
        url: "/storage-locations",
        query,
        schema: StorageLocationSchema,
        page: 0,
        pageSize: 15,
        sortBy: "name",
        sortOrder: "asc",
        searchBy: {
            name: true,
            room: true,
        },
    });
    return storage.data;
};
