import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { ReagentOrderByRelationAggregateInputSchema } from "./ReagentOrderByRelationAggregateInputSchema";

export const SampleOrderByWithRelationInputSchema: z.ZodType<Prisma.SampleOrderByWithRelationInput> =
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
            reagents: z.lazy(() => ReagentOrderByRelationAggregateInputSchema).optional(),
        })
        .strict();

export default SampleOrderByWithRelationInputSchema;
