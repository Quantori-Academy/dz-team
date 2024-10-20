import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { UuidFilterSchema } from "./UuidFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { FloatFilterSchema } from "./FloatFilterSchema";
import { FloatNullableFilterSchema } from "./FloatNullableFilterSchema";
import { DateTimeNullableFilterSchema } from "./DateTimeNullableFilterSchema";
import { DateTimeFilterSchema } from "./DateTimeFilterSchema";

export const ReagentScalarWhereInputSchema: z.ZodType<Prisma.ReagentScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ReagentScalarWhereInputSchema),
                z.lazy(() => ReagentScalarWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ReagentScalarWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ReagentScalarWhereInputSchema),
                z.lazy(() => ReagentScalarWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
        name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        structure: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        quantity: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        unit: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        size: z
            .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
            .optional()
            .nullable(),
        expirationDate: z
            .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        storageLocation: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        cas: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        producer: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        catalogId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        catalogLink: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        pricePerUnit: z
            .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
            .optional()
            .nullable(),
        deletedAt: z
            .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    })
    .strict();

export default ReagentScalarWhereInputSchema;
