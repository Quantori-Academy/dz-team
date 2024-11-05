import { z } from "zod";

const storageReagnets = z.object({
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
    status: z.enum(["out_of_stock", "ordered", "available"]),
});

const StorageLocationTypes = z.object({
    id: z.string(),
    room: z.string(),
    name: z.string(),
    description: z.string(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    reagents: z.array(storageReagnets).nullable(),
});

export const contractDetailedStorage = z.object({
    storageLocation: StorageLocationTypes,
});

export const contractStorageType = z.array(StorageLocationTypes);

export type DetailedStorage = z.infer<typeof contractDetailedStorage>;
export type StorageType = z.infer<typeof contractStorageType>;
