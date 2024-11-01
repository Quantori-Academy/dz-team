import { z } from "zod";

import { base, request } from "../request";

const StorageReagentTypes = z.object({
    id: z.string(),
    name: z.string(),
    structure: z.string(),
    description: z.string(),
    quantity: z.number(),
    unit: z.string(),
    size: z.number(),
    expirationDate: z.string(),
    cas: z.string(),
    producer: z.string(),
    catalogId: z.string(),
    catalogLink: z.string().url(),
    pricePerUnit: z.number(),
    category: z.string(),
    status: z.string(),
});

const StorageLocationTypes = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});

const StorageLocation = z.object({
    storageLocation: StorageLocationTypes,
    reagents: z.array(StorageReagentTypes),
});
const ApiResponseType = z.array(StorageLocation);
export type StorageType = z.infer<typeof ApiResponseType>;
export const getStorage = async () => {
    const Storage = await request(`${base}/api/v1/storage-locations`, ApiResponseType);
    return Storage;
};
