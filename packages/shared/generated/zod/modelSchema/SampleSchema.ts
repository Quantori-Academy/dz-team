import { z } from "zod";
import type { ReagentWithRelations } from "./ReagentSchema";
import type { ReagentPartialWithRelations } from "./ReagentSchema";
import type { ReagentOptionalDefaultsWithRelations } from "./ReagentSchema";
import { ReagentWithRelationsSchema } from "./ReagentSchema";
import { ReagentPartialWithRelationsSchema } from "./ReagentSchema";
import { ReagentOptionalDefaultsWithRelationsSchema } from "./ReagentSchema";

/////////////////////////////////////////
// SAMPLE SCHEMA
/////////////////////////////////////////

export const SampleSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    structure: z.string().nullish(),
    initialQuantity: z.number(),
    unit: z.string(),
    deletedAt: z.coerce.date().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type Sample = z.infer<typeof SampleSchema>;

/////////////////////////////////////////
// SAMPLE PARTIAL SCHEMA
/////////////////////////////////////////

export const SamplePartialSchema = SampleSchema.partial();

export type SamplePartial = z.infer<typeof SamplePartialSchema>;

/////////////////////////////////////////
// SAMPLE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SampleOptionalDefaultsSchema = SampleSchema.merge(
    z.object({
        id: z.string().uuid().optional(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
    })
);

export type SampleOptionalDefaults = z.infer<typeof SampleOptionalDefaultsSchema>;

/////////////////////////////////////////
// SAMPLE RELATION SCHEMA
/////////////////////////////////////////

export type SampleRelations = {
    reagents: ReagentWithRelations[];
};

export type SampleWithRelations = z.infer<typeof SampleSchema> & SampleRelations;

export const SampleWithRelationsSchema: z.ZodType<SampleWithRelations> = SampleSchema.merge(
    z.object({
        reagents: z.lazy(() => ReagentWithRelationsSchema).array(),
    })
);

/////////////////////////////////////////
// SAMPLE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SampleOptionalDefaultsRelations = {
    reagents: ReagentOptionalDefaultsWithRelations[];
};

export type SampleOptionalDefaultsWithRelations = z.infer<typeof SampleOptionalDefaultsSchema> &
    SampleOptionalDefaultsRelations;

export const SampleOptionalDefaultsWithRelationsSchema: z.ZodType<SampleOptionalDefaultsWithRelations> =
    SampleOptionalDefaultsSchema.merge(
        z.object({
            reagents: z.lazy(() => ReagentOptionalDefaultsWithRelationsSchema).array(),
        })
    );

/////////////////////////////////////////
// SAMPLE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type SamplePartialRelations = {
    reagents?: ReagentPartialWithRelations[];
};

export type SamplePartialWithRelations = z.infer<typeof SamplePartialSchema> &
    SamplePartialRelations;

export const SamplePartialWithRelationsSchema: z.ZodType<SamplePartialWithRelations> =
    SamplePartialSchema.merge(
        z.object({
            reagents: z.lazy(() => ReagentPartialWithRelationsSchema).array(),
        })
    ).partial();

export type SampleOptionalDefaultsWithPartialRelations = z.infer<
    typeof SampleOptionalDefaultsSchema
> &
    SamplePartialRelations;

export const SampleOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SampleOptionalDefaultsWithPartialRelations> =
    SampleOptionalDefaultsSchema.merge(
        z
            .object({
                reagents: z.lazy(() => ReagentPartialWithRelationsSchema).array(),
            })
            .partial()
    );

export type SampleWithPartialRelations = z.infer<typeof SampleSchema> & SamplePartialRelations;

export const SampleWithPartialRelationsSchema: z.ZodType<SampleWithPartialRelations> =
    SampleSchema.merge(
        z
            .object({
                reagents: z.lazy(() => ReagentPartialWithRelationsSchema).array(),
            })
            .partial()
    );

export default SampleSchema;
