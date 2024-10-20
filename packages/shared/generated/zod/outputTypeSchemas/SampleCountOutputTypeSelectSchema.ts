import { z } from "zod";
import type { Prisma } from "@prisma/client";

export const SampleCountOutputTypeSelectSchema: z.ZodType<Prisma.SampleCountOutputTypeSelect> = z
    .object({
        reagents: z.boolean().optional(),
    })
    .strict();

export default SampleCountOutputTypeSelectSchema;
