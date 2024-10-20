import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentWhereInputSchema } from "../inputTypeSchemas/ReagentWhereInputSchema";
import { ReagentOrderByWithRelationInputSchema } from "../inputTypeSchemas/ReagentOrderByWithRelationInputSchema";
import { ReagentWhereUniqueInputSchema } from "../inputTypeSchemas/ReagentWhereUniqueInputSchema";

export const ReagentAggregateArgsSchema: z.ZodType<Prisma.ReagentAggregateArgs> = z
    .object({
        where: ReagentWhereInputSchema.optional(),
        orderBy: z
            .union([
                ReagentOrderByWithRelationInputSchema.array(),
                ReagentOrderByWithRelationInputSchema,
            ])
            .optional(),
        cursor: ReagentWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
    })
    .strict();

export default ReagentAggregateArgsSchema;
