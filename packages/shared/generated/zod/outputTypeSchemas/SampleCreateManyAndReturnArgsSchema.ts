import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleCreateManyInputSchema } from "../inputTypeSchemas/SampleCreateManyInputSchema";

export const SampleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SampleCreateManyAndReturnArgs> =
    z
        .object({
            data: z.union([SampleCreateManyInputSchema, SampleCreateManyInputSchema.array()]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict();

export default SampleCreateManyAndReturnArgsSchema;
