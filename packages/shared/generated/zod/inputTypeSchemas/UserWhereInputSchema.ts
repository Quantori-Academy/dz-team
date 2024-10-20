import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { UuidFilterSchema } from "./UuidFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { EnumRoleFilterSchema } from "./EnumRoleFilterSchema";
import { RoleSchema } from "./RoleSchema";
import { DateTimeFilterSchema } from "./DateTimeFilterSchema";

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
    .object({
        AND: z
            .union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
            .optional(),
        OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
            .optional(),
        id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
        username: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        firstName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        lastName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        password: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    })
    .strict();

export default UserWhereInputSchema;
