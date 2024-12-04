import { z } from "zod";

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

export type CreateOrderReagent = z.infer<typeof _CreateOrderReagentContract>;
