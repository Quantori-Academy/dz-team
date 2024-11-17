import { z } from "zod";

const storageReagnets = z.object({
    id: z.string(),
    name: z.string().nullable(),
    structure: z.string().nullable(),
    description: z.string().nullable(),
    quantity: z.number(),
    unit: z.string().nullable(),
    size: z.number().nullable(),
    expirationDate: z.string().nullable(),
    storageLocation: z.string(),
    cas: z.string().nullable(),
    producer: z.string().nullable(),
    catalogId: z.string().nullable(),
    catalogLink: z.string().nullable(),
    pricePerUnit: z.number().nullable(),
    category: z.string().nullable(),
    status: z.string().nullable(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const StorageLocationTypes = z.object({
    id: z.string(),
    room: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    deletedAt: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    reagents: z.array(storageReagnets).nullable().optional(),
});

export const contractStorageType = z.object({
    data: z.array(StorageLocationTypes),
});

export type ContractStorageType = z.infer<typeof contractStorageType>;
export type DetailedStorage = z.infer<typeof StorageLocationTypes>;
export type StorageType = z.infer<typeof contractStorageType>;
