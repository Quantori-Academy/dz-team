import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { UserWhereInputSchema } from "../inputTypeSchemas/UserWhereInputSchema";
import { UserOrderByWithRelationInputSchema } from "../inputTypeSchemas/UserOrderByWithRelationInputSchema";
import { UserWhereUniqueInputSchema } from "../inputTypeSchemas/UserWhereUniqueInputSchema";
import { UserScalarFieldEnumSchema } from "../inputTypeSchemas/UserScalarFieldEnumSchema";
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

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z
    .object({
        select: UserSelectSchema.optional(),
        where: UserWhereInputSchema.optional(),
        orderBy: z
            .union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
            .optional(),
        cursor: UserWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z
            .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
            .optional(),
    })
    .strict();

export default UserFindFirstOrThrowArgsSchema;