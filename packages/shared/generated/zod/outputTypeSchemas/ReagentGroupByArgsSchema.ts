import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentWhereInputSchema } from "../inputTypeSchemas/ReagentWhereInputSchema";
import { ReagentOrderByWithAggregationInputSchema } from "../inputTypeSchemas/ReagentOrderByWithAggregationInputSchema";
import { ReagentScalarFieldEnumSchema } from "../inputTypeSchemas/ReagentScalarFieldEnumSchema";
import { ReagentScalarWhereWithAggregatesInputSchema } from "../inputTypeSchemas/ReagentScalarWhereWithAggregatesInputSchema";

export const ReagentGroupByArgsSchema: z.ZodType<Prisma.ReagentGroupByArgs> = z
    .object({
        where: ReagentWhereInputSchema.optional(),
        orderBy: z
            .union([
                ReagentOrderByWithAggregationInputSchema.array(),
                ReagentOrderByWithAggregationInputSchema,
            ])
            .optional(),
        by: ReagentScalarFieldEnumSchema.array(),
        having: ReagentScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export default ReagentGroupByArgsSchema;
