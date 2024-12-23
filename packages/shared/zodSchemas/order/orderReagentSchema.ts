import { z } from "zod";
import { UnitSchema } from "../../generated/zod";

export const OrderReagentsSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string().min(1, "Name is required"),
        structure: z.string().optional(),
        cas: z.string().optional(),
        producer: z.string(),
        catalogId: z.string().optional(),
        catalogLink: z.string().url().optional(),
        unit: UnitSchema,
        pricePerUnit: z.number(),
        quantity: z.number().gt(0, "Quantity must be greater than 0"),
        amount: z.number().min(1),
    })
    .strict(); // Ensure no additional fields are allowed
