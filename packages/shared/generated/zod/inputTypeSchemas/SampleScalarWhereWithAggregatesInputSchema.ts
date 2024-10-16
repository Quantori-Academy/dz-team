import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { UuidWithAggregatesFilterSchema } from "./UuidWithAggregatesFilterSchema";
import { StringWithAggregatesFilterSchema } from "./StringWithAggregatesFilterSchema";
import { StringNullableWithAggregatesFilterSchema } from "./StringNullableWithAggregatesFilterSchema";
import { FloatWithAggregatesFilterSchema } from "./FloatWithAggregatesFilterSchema";
import { DateTimeNullableWithAggregatesFilterSchema } from "./DateTimeNullableWithAggregatesFilterSchema";
import { DateTimeWithAggregatesFilterSchema } from "./DateTimeWithAggregatesFilterSchema";

export const SampleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SampleScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => SampleScalarWhereWithAggregatesInputSchema),
                    z.lazy(() => SampleScalarWhereWithAggregatesInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => SampleScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => SampleScalarWhereWithAggregatesInputSchema),
                    z.lazy(() => SampleScalarWhereWithAggregatesInputSchema).array(),
                ])
                .optional(),
            id: z.union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()]).optional(),
            title: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
            description: z
                .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
                .optional(),
            structure: z
                .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
                .optional()
                .nullable(),
            initialQuantity: z
                .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
                .optional(),
            unit: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
            deletedAt: z
                .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
                .optional()
                .nullable(),
            createdAt: z
                .union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
                .optional(),
            updatedAt: z
                .union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
                .optional(),
        })
        .strict();

export default SampleScalarWhereWithAggregatesInputSchema;
