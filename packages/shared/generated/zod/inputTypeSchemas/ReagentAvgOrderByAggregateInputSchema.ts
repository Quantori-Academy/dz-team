import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const ReagentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReagentAvgOrderByAggregateInput> =
    z
        .object({
            quantity: z.lazy(() => SortOrderSchema).optional(),
            size: z.lazy(() => SortOrderSchema).optional(),
            pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export default ReagentAvgOrderByAggregateInputSchema;
