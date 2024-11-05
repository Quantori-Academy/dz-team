import { z } from "zod";

const StorageLocationTypes = z.object({
    id: z.string(),
    room: z.string(),
    name: z.string(),
    description: z.string(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    reagents: z.array(z.any()),
});

// const StorageLocationTypes = z.object({
//     id: z.string(),
//     name: z.string(),
//     description: z.string(),
// });

// export const StorageLocation = z.object({
//     storageLocation: StorageLocationTypes,
//     reagents: z.array(StorageReagentTypes),
// });

export const ApiStorageType = z.array(StorageLocationTypes);

// export type DetaileStorage = z.infer<typeof StorageLocation>;
export type StorageType = z.infer<typeof ApiStorageType>;
