import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { SampleCountOrderByAggregateInputSchema } from "./SampleCountOrderByAggregateInputSchema";
import { SampleAvgOrderByAggregateInputSchema } from "./SampleAvgOrderByAggregateInputSchema";
import { SampleMaxOrderByAggregateInputSchema } from "./SampleMaxOrderByAggregateInputSchema";
import { SampleMinOrderByAggregateInputSchema } from "./SampleMinOrderByAggregateInputSchema";
import { SampleSumOrderByAggregateInputSchema } from "./SampleSumOrderByAggregateInputSchema";

export const SampleOrderByWithAggregationInputSchema: z.ZodType<Prisma.SampleOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            title: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            structure: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            initialQuantity: z.lazy(() => SortOrderSchema).optional(),
            unit: z.lazy(() => SortOrderSchema).optional(),
            deletedAt: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            _count: z.lazy(() => SampleCountOrderByAggregateInputSchema).optional(),
            _avg: z.lazy(() => SampleAvgOrderByAggregateInputSchema).optional(),
            _max: z.lazy(() => SampleMaxOrderByAggregateInputSchema).optional(),
            _min: z.lazy(() => SampleMinOrderByAggregateInputSchema).optional(),
            _sum: z.lazy(() => SampleSumOrderByAggregateInputSchema).optional(),
        })
        .strict();

export default SampleOrderByWithAggregationInputSchema;
