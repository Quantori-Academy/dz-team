import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentFindManyArgsSchema } from "../outputTypeSchemas/ReagentFindManyArgsSchema";
import { SampleCountOutputTypeArgsSchema } from "../outputTypeSchemas/SampleCountOutputTypeArgsSchema";

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

export default SampleSelectSchema;
