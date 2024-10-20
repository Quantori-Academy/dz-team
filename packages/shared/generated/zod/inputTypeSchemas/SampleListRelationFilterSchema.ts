import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SampleWhereInputSchema } from "./SampleWhereInputSchema";

export const SampleListRelationFilterSchema: z.ZodType<Prisma.SampleListRelationFilter> = z
    .object({
        every: z.lazy(() => SampleWhereInputSchema).optional(),
        some: z.lazy(() => SampleWhereInputSchema).optional(),
        none: z.lazy(() => SampleWhereInputSchema).optional(),
    })
    .strict();

export default SampleListRelationFilterSchema;
