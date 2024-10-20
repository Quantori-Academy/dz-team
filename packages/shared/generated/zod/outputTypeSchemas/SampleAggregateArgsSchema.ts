import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleWhereInputSchema } from "../inputTypeSchemas/SampleWhereInputSchema";
import { SampleOrderByWithRelationInputSchema } from "../inputTypeSchemas/SampleOrderByWithRelationInputSchema";
import { SampleWhereUniqueInputSchema } from "../inputTypeSchemas/SampleWhereUniqueInputSchema";

export const SampleAggregateArgsSchema: z.ZodType<Prisma.SampleAggregateArgs> = z
    .object({
        where: SampleWhereInputSchema.optional(),
        orderBy: z
            .union([
                SampleOrderByWithRelationInputSchema.array(),
                SampleOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: SampleWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export default SampleAggregateArgsSchema;
