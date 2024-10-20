import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { NullableStringFieldUpdateOperationsInputSchema } from "./NullableStringFieldUpdateOperationsInputSchema";
import { FloatFieldUpdateOperationsInputSchema } from "./FloatFieldUpdateOperationsInputSchema";
import { NullableFloatFieldUpdateOperationsInputSchema } from "./NullableFloatFieldUpdateOperationsInputSchema";
import { NullableDateTimeFieldUpdateOperationsInputSchema } from "./NullableDateTimeFieldUpdateOperationsInputSchema";
import { DateTimeFieldUpdateOperationsInputSchema } from "./DateTimeFieldUpdateOperationsInputSchema";

export const ReagentUncheckedUpdateWithoutSamplesInputSchema: z.ZodType<Prisma.ReagentUncheckedUpdateWithoutSamplesInput> =
    z
        .object({
            id: z
                .union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            name: z
                .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            structure: z
                .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
            description: z
                .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            quantity: z
                .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)])
                .optional(),
            unit: z
                .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            size: z
                .union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
            expirationDate: z
                .union([
                    z.coerce.date(),
                    z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
                ])
                .optional()
                .nullable(),
            storageLocation: z
                .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
                .optional(),
            cas: z
                .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
            producer: z
                .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
            catalogId: z
                .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
            catalogLink: z
                .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
            pricePerUnit: z
                .union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
                .optional()
                .nullable(),
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

export default ReagentUncheckedUpdateWithoutSamplesInputSchema;
