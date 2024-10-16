import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { SampleOrderByRelationAggregateInputSchema } from "./SampleOrderByRelationAggregateInputSchema";

export const ReagentOrderByWithRelationInputSchema: z.ZodType<Prisma.ReagentOrderByWithRelationInput> =
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
            samples: z.lazy(() => SampleOrderByRelationAggregateInputSchema).optional(),
        })
        .strict();

export default ReagentOrderByWithRelationInputSchema;
