import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { UserUpdateInputSchema } from "../inputTypeSchemas/UserUpdateInputSchema";
import { UserUncheckedUpdateInputSchema } from "../inputTypeSchemas/UserUncheckedUpdateInputSchema";
import { UserWhereUniqueInputSchema } from "../inputTypeSchemas/UserWhereUniqueInputSchema";
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
    .object({
        id: z.boolean().optional(),
        username: z.boolean().optional(),
        firstName: z.boolean().optional(),
        lastName: z.boolean().optional(),
        email: z.boolean().optional(),
        password: z.boolean().optional(),
        role: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updatedAt: z.boolean().optional(),
    })
    .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
    .object({
        select: UserSelectSchema.optional(),
        data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
        where: UserWhereUniqueInputSchema,
    })
    .strict();

export default UserUpdateArgsSchema;
