import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const SampleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SampleOrderByRelationAggregateInput> =
    z
        .object({
            _count: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export default SampleOrderByRelationAggregateInputSchema;
