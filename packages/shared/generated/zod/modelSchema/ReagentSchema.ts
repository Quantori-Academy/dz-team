import { z } from "zod";
import type { SampleWithRelations } from "./SampleSchema";
import type { SamplePartialWithRelations } from "./SampleSchema";
import type { SampleOptionalDefaultsWithRelations } from "./SampleSchema";
import { SampleWithRelationsSchema } from "./SampleSchema";
import { SamplePartialWithRelationsSchema } from "./SampleSchema";
import { SampleOptionalDefaultsWithRelationsSchema } from "./SampleSchema";

/////////////////////////////////////////
// REAGENT SCHEMA
/////////////////////////////////////////

export const ReagentSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    structure: z.string().nullish(),
    description: z.string(),
    quantity: z.number(),
    unit: z.string(),
    size: z.number().nullish(),
    expirationDate: z.coerce.date().nullish(),
    storageLocation: z.string(),
    cas: z.string().nullish(),
    producer: z.string().nullish(),
    catalogId: z.string().nullish(),
    catalogLink: z.string().nullish(),
    pricePerUnit: z.number().nullish(),
    deletedAt: z.coerce.date().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type Reagent = z.infer<typeof ReagentSchema>;

/////////////////////////////////////////
// REAGENT PARTIAL SCHEMA
/////////////////////////////////////////

export const ReagentPartialSchema = ReagentSchema.partial();

export type ReagentPartial = z.infer<typeof ReagentPartialSchema>;

/////////////////////////////////////////
// REAGENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ReagentOptionalDefaultsSchema = ReagentSchema.merge(
    z.object({
        id: z.string().uuid().optional(),
        storageLocation: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
    })
);

export type ReagentOptionalDefaults = z.infer<typeof ReagentOptionalDefaultsSchema>;

/////////////////////////////////////////
// REAGENT RELATION SCHEMA
/////////////////////////////////////////

export type ReagentRelations = {
    samples: SampleWithRelations[];
};

export type ReagentWithRelations = z.infer<typeof ReagentSchema> & ReagentRelations;

export const ReagentWithRelationsSchema: z.ZodType<ReagentWithRelations> = ReagentSchema.merge(
    z.object({
        samples: z.lazy(() => SampleWithRelationsSchema).array(),
    })
);

/////////////////////////////////////////
// REAGENT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ReagentOptionalDefaultsRelations = {
    samples: SampleOptionalDefaultsWithRelations[];
};

export type ReagentOptionalDefaultsWithRelations = z.infer<typeof ReagentOptionalDefaultsSchema> &
    ReagentOptionalDefaultsRelations;

export const ReagentOptionalDefaultsWithRelationsSchema: z.ZodType<ReagentOptionalDefaultsWithRelations> =
    ReagentOptionalDefaultsSchema.merge(
        z.object({
            samples: z.lazy(() => SampleOptionalDefaultsWithRelationsSchema).array(),
        })
    );

/////////////////////////////////////////
// REAGENT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ReagentPartialRelations = {
    samples?: SamplePartialWithRelations[];
};

export type ReagentPartialWithRelations = z.infer<typeof ReagentPartialSchema> &
    ReagentPartialRelations;

export const ReagentPartialWithRelationsSchema: z.ZodType<ReagentPartialWithRelations> =
    ReagentPartialSchema.merge(
        z.object({
            samples: z.lazy(() => SamplePartialWithRelationsSchema).array(),
        })
    ).partial();

export type ReagentOptionalDefaultsWithPartialRelations = z.infer<
    typeof ReagentOptionalDefaultsSchema
> &
    ReagentPartialRelations;

export const ReagentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ReagentOptionalDefaultsWithPartialRelations> =
    ReagentOptionalDefaultsSchema.merge(
        z
            .object({
                samples: z.lazy(() => SamplePartialWithRelationsSchema).array(),
            })
            .partial()
    );

export type ReagentWithPartialRelations = z.infer<typeof ReagentSchema> & ReagentPartialRelations;

export const ReagentWithPartialRelationsSchema: z.ZodType<ReagentWithPartialRelations> =
    ReagentSchema.merge(
        z
            .object({
                samples: z.lazy(() => SamplePartialWithRelationsSchema).array(),
            })
            .partial()
    );

export default ReagentSchema;
