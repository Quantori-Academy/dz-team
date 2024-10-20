import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const SampleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SampleAvgOrderByAggregateInput> =
    z
        .object({
            initialQuantity: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export default SampleAvgOrderByAggregateInputSchema;
