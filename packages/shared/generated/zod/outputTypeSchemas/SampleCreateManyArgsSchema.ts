import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleCreateManyInputSchema } from "../inputTypeSchemas/SampleCreateManyInputSchema";

export const SampleCreateManyArgsSchema: z.ZodType<Prisma.SampleCreateManyArgs> = z
    .object({
        data: z.union([SampleCreateManyInputSchema, SampleCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default SampleCreateManyArgsSchema;
