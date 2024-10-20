import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { RoleSchema } from "./RoleSchema";

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
    .object({
        id: z.string().uuid().optional(),
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.lazy(() => RoleSchema),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
    })
    .strict();

export default UserCreateInputSchema;
