import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const ReagentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReagentOrderByRelationAggregateInput> =
    z
        .object({
            _count: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export default ReagentOrderByRelationAggregateInputSchema;
