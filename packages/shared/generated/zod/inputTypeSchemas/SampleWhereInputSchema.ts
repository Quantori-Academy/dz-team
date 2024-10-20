import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { UuidFilterSchema } from "./UuidFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { FloatFilterSchema } from "./FloatFilterSchema";
import { DateTimeNullableFilterSchema } from "./DateTimeNullableFilterSchema";
import { DateTimeFilterSchema } from "./DateTimeFilterSchema";
import { ReagentListRelationFilterSchema } from "./ReagentListRelationFilterSchema";

export const SampleWhereInputSchema: z.ZodType<Prisma.SampleWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => SampleWhereInputSchema),
                z.lazy(() => SampleWhereInputSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => SampleWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => SampleWhereInputSchema),
                z.lazy(() => SampleWhereInputSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
        title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        structure: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        initialQuantity: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        unit: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        deletedAt: z
            .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        reagents: z.lazy(() => ReagentListRelationFilterSchema).optional(),
    })
    .strict();

export default SampleWhereInputSchema;
