import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentFindManyArgsSchema } from "../outputTypeSchemas/ReagentFindManyArgsSchema";
import { SampleCountOutputTypeArgsSchema } from "../outputTypeSchemas/SampleCountOutputTypeArgsSchema";

export const SampleIncludeSchema: z.ZodType<Prisma.SampleInclude> = z
    .object({
        reagents: z.union([z.boolean(), z.lazy(() => ReagentFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => SampleCountOutputTypeArgsSchema)]).optional(),
    })
    .strict();

export default SampleIncludeSchema;
