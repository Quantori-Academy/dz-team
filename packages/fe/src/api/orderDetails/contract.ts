import { z } from "zod";

const _ReagentDetailsOrderContract = z.object({
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

const _CreateOrderReagentContract = z.object({
    id: z.string(),
    name: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    structure: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    quantity: z
        .number()
        .nullable()
        .transform((val) => val || 0),
    units: z
        .string()
        .nullable()
        .transform((val) => val || "ml"),
    cas: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    producer: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    catalogId: z
        .string()
        .nullable()
        .transform((val) => val || ""),
    catalogLink: z.string().url().optional(),
    pricePerUnit: z
        .number()
        .nullable()
        .transform((val) => val || 0),
    amount: z
        .number()
        .nullable()
        .transform((val) => val || 0),
});

export type ReagentDetailsOrder = z.infer<typeof _ReagentDetailsOrderContract>;
export type CreateOrderReagent = z.infer<typeof _CreateOrderReagentContract>;
