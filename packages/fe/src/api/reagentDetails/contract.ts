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
    storageLocation: z
        .string()
        .nullable()
        .transform((val) => val || ""),
});

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
export const ReagentOrderContract = z.object({
    id: z.string().optional(),
    name: z.string().nullable(),
    structure: z.string().nullable(),
    cas: z.string().nullable(),
    producer: z.string().nullable(),
    catalogId: z.string().nullable(),
    catalogLink: z.string().nullable(),
    units: z
        .string()
        .nullable()
        .transform((val) => val || "ml"),
    pricePerUnit: z.number().nullable(),
    quantity: z.number().nullable(),
    amount: z.number().nullable().optional(),
});

export type ReagentDetails = z.infer<typeof ReagentDetailsContract>;
export type ReagentDetailsEdit = z.infer<typeof ReagentDetailsEditContract>;
export type ReagentDetailsOrder = z.infer<typeof ReagentDetailsOrderContract>;
export type ReagentDetailsOrderType = z.infer<typeof ReagentOrderContract>;
