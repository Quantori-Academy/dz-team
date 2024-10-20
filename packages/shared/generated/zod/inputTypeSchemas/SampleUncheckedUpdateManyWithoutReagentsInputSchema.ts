import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { NullableStringFieldUpdateOperationsInputSchema } from "./NullableStringFieldUpdateOperationsInputSchema";
import { FloatFieldUpdateOperationsInputSchema } from "./FloatFieldUpdateOperationsInputSchema";
import { NullableDateTimeFieldUpdateOperationsInputSchema } from "./NullableDateTimeFieldUpdateOperationsInputSchema";
import { DateTimeFieldUpdateOperationsInputSchema } from "./DateTimeFieldUpdateOperationsInputSchema";

export const SampleUncheckedUpdateManyWithoutReagentsInputSchema: z.ZodType<Prisma.SampleUncheckedUpdateManyWithoutReagentsInput> =
    z
        .object({
            id: z
                .union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            title: z
                .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            description: z
                .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            structure: z
                .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
            initialQuantity: z
                .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
                .optional(),
            unit: z
                .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            deletedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional()
                .nullable(),
            createdAt: z
                .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
                .optional(),
            updatedAt: z
                .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
                .optional(),
        })
        .strict();

export default SampleUncheckedUpdateManyWithoutReagentsInputSchema;
