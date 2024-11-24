import { base, request } from "api/request";

import { StorageLocationContract } from "./contract";

export const updateStorage = async ({
    reagentIds,
    storageRoomId,
}: {
    reagentIds: string;
    storageRoomId: string;
}) => {
    const storage = await request(
        `${base}/api/v1/move-items${reagentIds}`,
        StorageLocationContract,
        {
            method: "POST",
            json: storageRoomId,
        },
    );

    return storage;
};
