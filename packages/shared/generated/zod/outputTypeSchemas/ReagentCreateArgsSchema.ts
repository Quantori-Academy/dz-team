import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentIncludeSchema } from "../inputTypeSchemas/ReagentIncludeSchema";
import { ReagentCreateInputSchema } from "../inputTypeSchemas/ReagentCreateInputSchema";
import { ReagentUncheckedCreateInputSchema } from "../inputTypeSchemas/ReagentUncheckedCreateInputSchema";
import { SampleFindManyArgsSchema } from "../outputTypeSchemas/SampleFindManyArgsSchema";
import { ReagentCountOutputTypeArgsSchema } from "../outputTypeSchemas/ReagentCountOutputTypeArgsSchema";
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ReagentSelectSchema: z.ZodType<Prisma.ReagentSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        structure: z.boolean().optional(),
        description: z.boolean().optional(),
        quantity: z.boolean().optional(),
        unit: z.boolean().optional(),
        size: z.boolean().optional(),
        expirationDate: z.boolean().optional(),
        storageLocation: z.boolean().optional(),
        cas: z.boolean().optional(),
        producer: z.boolean().optional(),
        catalogId: z.boolean().optional(),
        catalogLink: z.boolean().optional(),
        pricePerUnit: z.boolean().optional(),
        deletedAt: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updatedAt: z.boolean().optional(),
        samples: z.union([z.boolean(), z.lazy(() => SampleFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => ReagentCountOutputTypeArgsSchema)]).optional(),
    })
    .strict();

export const ReagentCreateArgsSchema: z.ZodType<Prisma.ReagentCreateArgs> = z
    .object({
        select: ReagentSelectSchema.optional(),
        include: ReagentIncludeSchema.optional(),
        data: z.union([ReagentCreateInputSchema, ReagentUncheckedCreateInputSchema]),
    })
    .strict();

export default ReagentCreateArgsSchema;
