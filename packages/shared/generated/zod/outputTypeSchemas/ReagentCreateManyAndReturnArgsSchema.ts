import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentCreateManyInputSchema } from "../inputTypeSchemas/ReagentCreateManyInputSchema";

export const ReagentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReagentCreateManyAndReturnArgs> =
    z
        .object({
            data: z.union([ReagentCreateManyInputSchema, ReagentCreateManyInputSchema.array()]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export default ReagentCreateManyAndReturnArgsSchema;
