import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentCreateManyInputSchema } from "../inputTypeSchemas/ReagentCreateManyInputSchema";

export const ReagentCreateManyArgsSchema: z.ZodType<Prisma.ReagentCreateManyArgs> = z
    .object({
        data: z.union([ReagentCreateManyInputSchema, ReagentCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default ReagentCreateManyArgsSchema;
