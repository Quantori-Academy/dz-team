import { z } from "zod";
import {
    DateTimeFieldUpdateOperationsInputSchema,
    EnumOrderStatusFieldUpdateOperationsInputSchema,
    InputJsonValueSchema,
    JsonNullValueInputSchema,
    NullableDateTimeFieldUpdateOperationsInputSchema,
    NullableStringFieldUpdateOperationsInputSchema,
    OrderStatusSchema,
    StringFieldUpdateOperationsInputSchema,
} from "../../generated/zod";

// Manually reconstruct the schema while adding userId
export const OrderCreateWithUserIdInputSchema = z.object({
    id: z.string().uuid().optional(), // Ensure id is optional, Prisma auto-generates if not provided
    title: z.string(),
    description: z.string().optional().nullable(),
    seller: z.string().optional().nullable(),
    status: z.lazy(() => OrderStatusSchema).optional(),
    deletedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    reagents: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema]),

    userId: z.string().uuid(),
});

const Reagent = z.object({
    id: z.string().uuid(),
    name: z.string(),
    structure: z.string(),
    cas: z.string(),
    producer: z.string(),
    catalogId: z.string(),
    catalogLink: z.string(),
    units: z.string(),
    pricePerUnit: z.number(),
    quantity: z.number(),
    amount: z.number(),
});

export const RequestOrderCreateWithUserIdInputSchema = z.object({
    id: z.string().uuid().optional(), // Ensure id is optional, Prisma auto-generates if not provided
    title: z.string(),
    description: z.string().optional().nullable(),
    seller: z.string().optional().nullable(),
    status: z.lazy(() => OrderStatusSchema).optional(),
    deletedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),

    userId: z.string().uuid(),
    requestIds: z.array(z.string()).optional(),

    reagents: z.lazy(() => z.array(Reagent)).optional(),

    producer: z.string().optional(),
    catalogId: z.string().optional(),
    catalogLink: z.string().optional(),
    pricePerUnit: z.number().optional(),
});

export const OrderUpdateWithUserIdInputSchema = z.object({
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    seller: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    status: z
        .union([
            z.lazy(() => OrderStatusSchema),
            z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    deletedAt: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    createdAt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
        .optional(),
    updatedAt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
        .optional(),
    reagents: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema]).optional(),

    // Optional userId field for updating the user associated with the order
    userId: z.string().uuid().optional(), // userId is optional here for updates
});
