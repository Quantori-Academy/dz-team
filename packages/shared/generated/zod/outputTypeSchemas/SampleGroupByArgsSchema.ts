import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleWhereInputSchema } from "../inputTypeSchemas/SampleWhereInputSchema";
import { SampleOrderByWithAggregationInputSchema } from "../inputTypeSchemas/SampleOrderByWithAggregationInputSchema";
import { SampleScalarFieldEnumSchema } from "../inputTypeSchemas/SampleScalarFieldEnumSchema";
import { SampleScalarWhereWithAggregatesInputSchema } from "../inputTypeSchemas/SampleScalarWhereWithAggregatesInputSchema";

export const SampleGroupByArgsSchema: z.ZodType<Prisma.SampleGroupByArgs> = z
    .object({
        where: SampleWhereInputSchema.optional(),
        orderBy: z
            .union([
                SampleOrderByWithAggregationInputSchema.array(),
                SampleOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: SampleScalarFieldEnumSchema.array(),
        having: SampleScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export default SampleGroupByArgsSchema;
