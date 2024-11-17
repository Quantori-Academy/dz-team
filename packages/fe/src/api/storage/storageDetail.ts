import { z } from "zod";

import { base, request } from "api/request";
import { ReagentSchema, StorageLocationSchema } from "shared/generated/zod";

const StorageLocationContract = StorageLocationSchema.merge(
    z.object({
        reagents: z.array(ReagentSchema),
    }),
);

export const getStorageDetail = async (id: string) => {
    const response = await request(
        `${base}/api/v1/storage-locations/${id}`,
        StorageLocationContract,
    );

    return response;
};
