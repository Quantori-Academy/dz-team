import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";

export const ReagentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReagentMaxOrderByAggregateInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            name: z.lazy(() => SortOrderSchema).optional(),
            structure: z.lazy(() => SortOrderSchema).optional(),
            description: z.lazy(() => SortOrderSchema).optional(),
            quantity: z.lazy(() => SortOrderSchema).optional(),
            unit: z.lazy(() => SortOrderSchema).optional(),
            size: z.lazy(() => SortOrderSchema).optional(),
            expirationDate: z.lazy(() => SortOrderSchema).optional(),
            storageLocation: z.lazy(() => SortOrderSchema).optional(),
            cas: z.lazy(() => SortOrderSchema).optional(),
            producer: z.lazy(() => SortOrderSchema).optional(),
            catalogId: z.lazy(() => SortOrderSchema).optional(),
            catalogLink: z.lazy(() => SortOrderSchema).optional(),
            pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
            deletedAt: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
        })
        .strict();

export default ReagentMaxOrderByAggregateInputSchema;
