import { z } from "zod";
import { CategorySchema, ContainerSchema, UnitSchema } from "../../generated/zod";

export const SampleCreateSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string(),
        structure: z.string().optional().nullable(),
        description: z.string(),
        quantity: z.number(),
        quantityInit: z.number().optional().nullable(),
        unit: z.lazy(() => UnitSchema).optional(),
        storageLocation: z.string().optional().nullable(),
        category: z.lazy(() => CategorySchema).optional(),
        container: z
            .lazy(() => ContainerSchema)
            .optional()
            .nullable(),
        deletedAt: z.coerce.date().optional().nullable(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
        reagentIds: z.array(z.string()).optional(), // Additional IDs array for convenience
        storageId: z.string().uuid(),
    })
    .strict();

export const SampleUpdateSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string().optional(),
        structure: z.string().optional().nullable(),
        description: z.string().optional(),
        quantity: z.number().optional(),
        quantityInit: z.number().optional().nullable(),
        unit: z.lazy(() => UnitSchema).optional(),
        storageLocation: z.string().optional().nullable(),
        category: z.lazy(() => CategorySchema).optional(),
        container: z
            .lazy(() => ContainerSchema)
            .optional()
            .nullable(),
        deletedAt: z.coerce.date().optional().nullable(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
        reagentIds: z.array(z.string()).optional(), // Optional array of reagentIds
        storageId: z.string().uuid().optional(),
    })
    .strict();
