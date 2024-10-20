import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { RoleSchema } from "./RoleSchema";
import { EnumRoleFieldUpdateOperationsInputSchema } from "./EnumRoleFieldUpdateOperationsInputSchema";
import { DateTimeFieldUpdateOperationsInputSchema } from "./DateTimeFieldUpdateOperationsInputSchema";

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z
    .object({
        id: z
            .union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
            .optional(),
        username: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
            .optional(),
        firstName: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
            .optional(),
        lastName: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
            .optional(),
        email: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
            .optional(),
        password: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
            .optional(),
        role: z
            .union([
                z.lazy(() => RoleSchema),
                z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
            ])
            .optional(),
        createdAt: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
            .optional(),
        updatedAt: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
            .optional(),
    })
    .strict();

export default UserUncheckedUpdateManyInputSchema;
