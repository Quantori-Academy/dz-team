import { z } from "zod";

export const CategorySchema = z.enum(["REAGENT", "SAMPLE"]);

export type CategoryType = `${z.infer<typeof CategorySchema>}`;

export default CategorySchema;
