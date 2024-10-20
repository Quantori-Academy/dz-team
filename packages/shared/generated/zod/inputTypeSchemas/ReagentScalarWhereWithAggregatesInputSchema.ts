import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { UuidWithAggregatesFilterSchema } from "./UuidWithAggregatesFilterSchema";
import { StringWithAggregatesFilterSchema } from "./StringWithAggregatesFilterSchema";
import { StringNullableWithAggregatesFilterSchema } from "./StringNullableWithAggregatesFilterSchema";
import { FloatWithAggregatesFilterSchema } from "./FloatWithAggregatesFilterSchema";
import { FloatNullableWithAggregatesFilterSchema } from "./FloatNullableWithAggregatesFilterSchema";
import { DateTimeNullableWithAggregatesFilterSchema } from "./DateTimeNullableWithAggregatesFilterSchema";
import { DateTimeWithAggregatesFilterSchema } from "./DateTimeWithAggregatesFilterSchema";

export const ReagentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReagentScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => ReagentScalarWhereWithAggregatesInputSchema),
                    z.lazy(() => ReagentScalarWhereWithAggregatesInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => ReagentScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => ReagentScalarWhereWithAggregatesInputSchema),
                    z.lazy(() => ReagentScalarWhereWithAggregatesInputSchema).array(),
                ])
                .optional(),
            id: z.union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()]).optional(),
            name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
            structure: z
                .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
                .optional()
                .nullable(),
            description: z
                .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
                .optional(),
            quantity: z
                .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
                .optional(),
            unit: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
            size: z
                .union([z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number()])
                .optional()
                .nullable(),
            expirationDate: z
                .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
                .optional()
                .nullable(),
            storageLocation: z
                .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
                .optional(),
            cas: z
                .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
                .optional()
                .nullable(),
            producer: z
                .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
                .optional()
                .nullable(),
            catalogId: z
                .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
                .optional()
                .nullable(),
            catalogLink: z
                .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
                .optional()
                .nullable(),
            pricePerUnit: z
                .union([z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number()])
                .optional()
                .nullable(),
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

export default ReagentScalarWhereWithAggregatesInputSchema;
