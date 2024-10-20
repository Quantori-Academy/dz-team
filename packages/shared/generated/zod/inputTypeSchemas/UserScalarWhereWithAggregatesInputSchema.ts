import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { UuidWithAggregatesFilterSchema } from "./UuidWithAggregatesFilterSchema";
import { StringWithAggregatesFilterSchema } from "./StringWithAggregatesFilterSchema";
import { EnumRoleWithAggregatesFilterSchema } from "./EnumRoleWithAggregatesFilterSchema";
import { RoleSchema } from "./RoleSchema";
import { DateTimeWithAggregatesFilterSchema } from "./DateTimeWithAggregatesFilterSchema";

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
                    z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
                ])
                .optional(),
            OR: z
                .lazy(() => UserScalarWhereWithAggregatesInputSchema)
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
                    z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
                ])
                .optional(),
            id: z.union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()]).optional(),
            username: z
                .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
                .optional(),
            firstName: z
                .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
                .optional(),
            lastName: z
                .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
                .optional(),
            email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
            password: z
                .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
                .optional(),
            role: z
                .union([z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema)])
                .optional(),
            createdAt: z
                .union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
                .optional(),
            updatedAt: z
                .union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
                .optional(),
        })
        .strict();

export default UserScalarWhereWithAggregatesInputSchema;
