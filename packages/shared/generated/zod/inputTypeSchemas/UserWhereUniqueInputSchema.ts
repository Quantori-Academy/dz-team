import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { UserWhereInputSchema } from "./UserWhereInputSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { EnumRoleFilterSchema } from "./EnumRoleFilterSchema";
import { RoleSchema } from "./RoleSchema";
import { DateTimeFilterSchema } from "./DateTimeFilterSchema";

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z
    .union([
        z.object({
            id: z.string().uuid(),
            username: z.string(),
            email: z.string(),
        }),
        z.object({
            id: z.string().uuid(),
            username: z.string(),
        }),
        z.object({
            id: z.string().uuid(),
            email: z.string(),
        }),
        z.object({
            id: z.string().uuid(),
        }),
        z.object({
            username: z.string(),
            email: z.string(),
        }),
        z.object({
            username: z.string(),
        }),
        z.object({
            email: z.string(),
        }),
    ])
    .and(
        z
            .object({
                id: z.string().uuid().optional(),
                username: z.string().optional(),
                email: z.string().optional(),
                AND: z
                    .union([
                        z.lazy(() => UserWhereInputSchema),
                        z.lazy(() => UserWhereInputSchema).array(),
                    ])
                    .optional(),
                OR: z
                    .lazy(() => UserWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([
                        z.lazy(() => UserWhereInputSchema),
                        z.lazy(() => UserWhereInputSchema).array(),
                    ])
                    .optional(),
                firstName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                lastName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                password: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                role: z
                    .union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
                    .optional(),
                createdAt: z
                    .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
                    .optional(),
                updatedAt: z
                    .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
                    .optional(),
            })
            .strict()
    );

export default UserWhereUniqueInputSchema;
