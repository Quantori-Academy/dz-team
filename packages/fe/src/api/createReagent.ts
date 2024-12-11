import { z } from "zod";

import { CategorySchema, CurrencySchema, UnitSchema } from "../../../shared/generated/zod";
import { request } from "./request";

export const createReagent = async (formData: ReagentCreateType) => {
    const response = await request(`/reagents`, ReagentCreateSchema, {
        method: "POST",
        json: formData,
        showErrorNotification: true,
        throwOnError: true,
    });

    return response;
};

export const ReagentCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    structure: z.string().min(1, "Structure is required").nullable(),
    description: z.string().min(1, "Description is required"),
    quantity: z.number().positive("Quantity must be positive"),
    unit: z.lazy(() => UnitSchema),
    expirationDate: z.string().min(1, "Expiration date is required").nullable(),
    storageLocation: z.string().min(1, "Storage location is required").nullable(),
    cas: z.string().min(1, "CAS is required").nullable(),
    producer: z.string().min(1, "Producer is required").nullable(),
    catalogId: z.string().min(1, "Catalog ID is required").nullable(),
    catalogLink: z.string().min(1, "Catalog link is required").nullable(),
    pricePerUnit: z
        .number()
        .min(1, "Price is required")
        .positive("Quantity must be positive")
        .nullable(),
    currency: z.lazy(() => CurrencySchema),
    category: z.lazy(() => CategorySchema),
});

export type ReagentCreateType = z.infer<typeof ReagentCreateSchema>;
