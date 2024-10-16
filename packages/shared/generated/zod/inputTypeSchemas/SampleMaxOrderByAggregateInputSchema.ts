import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const SampleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SampleMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            title: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            structure: z.lazy(() => SortOrderSchema).optional(),
            initialQuantity: z.lazy(() => SortOrderSchema).optional(),
            unit: z.lazy(() => SortOrderSchema).optional(),
            deletedAt: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export default SampleMaxOrderByAggregateInputSchema;
