import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const SampleSumOrderByAggregateInputSchema: z.ZodType<Prisma.SampleSumOrderByAggregateInput> =
    z
        .object({
            initialQuantity: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export default SampleSumOrderByAggregateInputSchema;
