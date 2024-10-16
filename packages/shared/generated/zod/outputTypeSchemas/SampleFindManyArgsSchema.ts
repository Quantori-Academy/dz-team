import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleIncludeSchema } from "../inputTypeSchemas/SampleIncludeSchema";
import { SampleWhereInputSchema } from "../inputTypeSchemas/SampleWhereInputSchema";
import { SampleOrderByWithRelationInputSchema } from "../inputTypeSchemas/SampleOrderByWithRelationInputSchema";
import { SampleWhereUniqueInputSchema } from "../inputTypeSchemas/SampleWhereUniqueInputSchema";
import { SampleScalarFieldEnumSchema } from "../inputTypeSchemas/SampleScalarFieldEnumSchema";
import { ReagentFindManyArgsSchema } from "../outputTypeSchemas/ReagentFindManyArgsSchema";
import { SampleCountOutputTypeArgsSchema } from "../outputTypeSchemas/SampleCountOutputTypeArgsSchema";
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SampleSelectSchema: z.ZodType<Prisma.SampleSelect> = z
    .object({
        id: z.boolean().optional(),
        title: z.boolean().optional(),
        description: z.boolean().optional(),
        structure: z.boolean().optional(),
        initialQuantity: z.boolean().optional(),
        unit: z.boolean().optional(),
        deletedAt: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updatedAt: z.boolean().optional(),
        reagents: z.union([z.boolean(), z.lazy(() => ReagentFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => SampleCountOutputTypeArgsSchema)]).optional(),
    })
    .strict();

export const SampleFindManyArgsSchema: z.ZodType<Prisma.SampleFindManyArgs> = z
    .object({
        select: SampleSelectSchema.optional(),
        include: SampleIncludeSchema.optional(),
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
        distinct: z
            .union([SampleScalarFieldEnumSchema, SampleScalarFieldEnumSchema.array()])
            .optional(),
    })
    .strict();

export default SampleFindManyArgsSchema;
