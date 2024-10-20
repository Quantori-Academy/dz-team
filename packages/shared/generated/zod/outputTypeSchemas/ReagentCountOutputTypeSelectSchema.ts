import { z } from "zod";
import type { Prisma } from "@prisma/client";

export const ReagentCountOutputTypeSelectSchema: z.ZodType<Prisma.ReagentCountOutputTypeSelect> = z
    .object({
        samples: z.boolean().optional(),
    })
    .strict();

export default ReagentCountOutputTypeSelectSchema;
