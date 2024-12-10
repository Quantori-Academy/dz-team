import { z } from "zod";

import { request } from "api/request";
import CategorySchema from "shared/generated/zod/inputTypeSchemas/CategorySchema";
import { ContainerSchema } from "shared/generated/zod/inputTypeSchemas/ContainerSchema";
import UnitSchema from "shared/generated/zod/inputTypeSchemas/UnitSchema";

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
        reagentIds: z.array(z.string()).optional(),
        storageId: z.string().uuid(),
    })
    .strict();

export type SampleDetails = z.infer<typeof SampleCreateSchema>;
export const getSampleDetail = async ({ id }: { id: string }) =>
    await request(`/samples/${id}`, SampleCreateSchema, {
        method: "GET",
    });
