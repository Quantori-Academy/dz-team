import { z } from "zod";

import { base, request } from "./request";

const Reagent = z.object({
    id: z.string(),
    name: z.string().nullable(),
    structure: z.string().nullable(),
    description: z.string().nullable(),
    quantity: z.number(),
    unit: z.string().nullable(),
    size: z.number().nullable(),
    expirationDate: z.string().nullable(),
    storageLocation: z.string(),
    cas: z.string().nullable(),
    producer: z.string().nullable(),
    catalogId: z.string().nullable(),
    catalogLink: z.string().nullable(),
    pricePerUnit: z.number().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
});

const ReagentsResponse = z.array(Reagent).optional();
export type ReagentType = z.infer<typeof Reagent>;

export const getReagentsApi = async () => {
    const reagents = await request(`${base}/api/v1/reagents`, ReagentsResponse);

    return reagents;
};
