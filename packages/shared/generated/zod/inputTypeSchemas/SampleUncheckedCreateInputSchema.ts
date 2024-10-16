import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentUncheckedCreateNestedManyWithoutSamplesInputSchema } from "./ReagentUncheckedCreateNestedManyWithoutSamplesInputSchema";

export const SampleUncheckedCreateInputSchema: z.ZodType<Prisma.SampleUncheckedCreateInput> = z
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
        reagents: z
            .lazy(() => ReagentUncheckedCreateNestedManyWithoutSamplesInputSchema)
            .optional(),
    })
    .strict();

export default SampleUncheckedCreateInputSchema;
