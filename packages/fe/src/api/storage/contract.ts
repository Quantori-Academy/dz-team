import { z } from "zod";

import { ReagentSchema } from "shared/generated/zod";

export const StorageLocationSchema = z.object({
    id: z.string().uuid(),
    room: z.string(),
    name: z.string(),
    description: z.string().nullish(),
    deletedAt: z.coerce.date().nullish(),
});
export const StorageLocationsAllContract = z.object({
    data: z.array(StorageLocationSchema),
});

export type StorageLocation = z.infer<typeof StorageLocationSchema>;

export const StorageLocationContract = z.object({
    id: z.string(),
    room: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    reagents: z.array(ReagentSchema).optional(),
});

export const StorageLocationDetailContract = StorageLocationSchema.merge(
    z.object({
        reagents: z.array(ReagentSchema),
    }),
);

export type StorageLocationDetailContractType = z.infer<typeof StorageLocationDetailContract>;
