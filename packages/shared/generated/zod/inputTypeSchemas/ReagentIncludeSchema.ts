import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleFindManyArgsSchema } from "../outputTypeSchemas/SampleFindManyArgsSchema";
import { ReagentCountOutputTypeArgsSchema } from "../outputTypeSchemas/ReagentCountOutputTypeArgsSchema";

export const ReagentIncludeSchema: z.ZodType<Prisma.ReagentInclude> = z
    .object({
        samples: z.union([z.boolean(), z.lazy(() => SampleFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => ReagentCountOutputTypeArgsSchema)]).optional(),
    })
    .strict();

export default ReagentIncludeSchema;
