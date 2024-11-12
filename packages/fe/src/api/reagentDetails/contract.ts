import { z } from "zod";

export const ReagentDetailsContract = z.object({
    id: z.string(),
    name: z.string().nullable(),
    structure: z.string().nullable(),
    description: z.string().nullable(),
    quantity: z.number(),
    unit: z.string().nullable(),
    expirationDate: z.string().nullable(),
    storageLocation: z
        .string()
        .nullable()
        .transform((val) => val || ""),
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

export const ReagentDetailsEditContract = z.object({
    id: z.string(),
    name: z.string().nullable(),
    cas: z.string().nullable(),
    producer: z.string().nullable(),
    pricePerUnit: z.number().nullable(),
    quantity: z.number(),
    unit: z.string().nullable(),
    storageLocation: z.string(),
});

export type ReagentDetails = z.infer<typeof ReagentDetailsContract>;
export type ReagentDetailsEdit = z.infer<typeof ReagentDetailsEditContract>;
