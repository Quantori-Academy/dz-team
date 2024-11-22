import { z } from "zod";

export const ReagentDetailsOrderContract = z.object({
    id: z.string().optional(),
    name: z.string().nullable(),
    structure: z.string().nullable(),
    description: z.string().nullable(),
    quantity: z.number(),
    unit: z
        .string()
        .nullable()
        .transform((val) => val || "ml"),
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
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    amount: z.number().nullable().optional(),
});

export type ReagentDetailsOrder = z.infer<typeof ReagentDetailsOrderContract>;
