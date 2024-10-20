import type { Prisma } from "@prisma/client";

import { z } from "zod";

export const SampleCreateManyInputSchema: z.ZodType<Prisma.SampleCreateManyInput> = z
    .object({
        id: z.string().uuid().optional(),
        title: z.string(),
        description: z.string(),
        structure: z.string().optional().nullable(),
        initialQuantity: z.number(),
        unit: z.string(),
        deletedAt: z.coerce.date().optional().nullable(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
    })
    .strict();

export default SampleCreateManyInputSchema;
