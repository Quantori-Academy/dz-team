import type { Prisma } from "@prisma/client";

import { z } from "zod";

export const ReagentCreateManyInputSchema: z.ZodType<Prisma.ReagentCreateManyInput> = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string(),
        structure: z.string().optional().nullable(),
        description: z.string(),
        quantity: z.number(),
        unit: z.string(),
        size: z.number().optional().nullable(),
        expirationDate: z.coerce.date().optional().nullable(),
        storageLocation: z.string().optional(),
        cas: z.string().optional().nullable(),
        producer: z.string().optional().nullable(),
        catalogId: z.string().optional().nullable(),
        catalogLink: z.string().optional().nullable(),
        pricePerUnit: z.number().optional().nullable(),
        deletedAt: z.coerce.date().optional().nullable(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
    })
    .strict();

export default ReagentCreateManyInputSchema;
