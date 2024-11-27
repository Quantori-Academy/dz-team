import { z } from "zod";

import { ReagentSchema, StorageLocationSchema } from "shared/generated/zod";

export const StorageLocationContract = z.object({
    id: z.string(),
    room: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    reagents: z.array(ReagentSchema).optional(),
});

export const contractStorageType = z.object({
    data: z.array(StorageLocationContract),
});

export const StorageLocationDetailContract = StorageLocationSchema.merge(
    z.object({
        reagents: z.array(ReagentSchema),
    }),
);

export type StorageLocationDetailContractType = z.infer<typeof StorageLocationDetailContract>;
