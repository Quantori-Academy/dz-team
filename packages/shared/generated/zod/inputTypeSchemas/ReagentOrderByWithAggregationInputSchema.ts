import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { ReagentCountOrderByAggregateInputSchema } from "./ReagentCountOrderByAggregateInputSchema";
import { ReagentAvgOrderByAggregateInputSchema } from "./ReagentAvgOrderByAggregateInputSchema";
import { ReagentMaxOrderByAggregateInputSchema } from "./ReagentMaxOrderByAggregateInputSchema";
import { ReagentMinOrderByAggregateInputSchema } from "./ReagentMinOrderByAggregateInputSchema";
import { ReagentSumOrderByAggregateInputSchema } from "./ReagentSumOrderByAggregateInputSchema";

export const ReagentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReagentOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            structure: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            quantity: z.lazy(() => SortOrderSchema).optional(),
            unit: z.lazy(() => SortOrderSchema).optional(),
            size: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            expirationDate: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            storageLocation: z.lazy(() => SortOrderSchema).optional(),
            cas: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            producer: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            catalogId: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            catalogLink: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            pricePerUnit: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            deletedAt: z
                .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
                .optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            _count: z.lazy(() => ReagentCountOrderByAggregateInputSchema).optional(),
            _avg: z.lazy(() => ReagentAvgOrderByAggregateInputSchema).optional(),
            _max: z.lazy(() => ReagentMaxOrderByAggregateInputSchema).optional(),
            _min: z.lazy(() => ReagentMinOrderByAggregateInputSchema).optional(),
            _sum: z.lazy(() => ReagentSumOrderByAggregateInputSchema).optional(),
        })
        .strict();

export default ReagentOrderByWithAggregationInputSchema;
