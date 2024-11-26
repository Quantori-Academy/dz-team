import { z } from "zod";

import { ReagentSchema, StorageLocationSchema } from "shared/generated/zod";

export const StorageLocationContract = z.object({
    id: z.string(),
    room: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    deletedAt: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    reagents: z.array(ReagentSchema).optional(),
});

export const contractStorageType = z.object({
    data: z.array(StorageLocationContract),
});

export type StorageType = z.infer<typeof contractStorageType>;

export const StorageLocationDetailContract = StorageLocationSchema.merge(
    z.object({
        reagents: z.array(ReagentSchema),
    }),
);

export type StorageLocationDetailContractType = z.infer<typeof StorageLocationDetailContract>;
