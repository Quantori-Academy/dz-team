import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

const SearchFieldEnum = z.enum([
    "name",
    "structure",
    "storageLocation",
    "catalogLink",
    "description",
]);

// THIS SCHEMA IS USED TILL REPLACEMENT IS FOUND IN AUTOGENERATED SCHEMAS
export const SampleSearchSchema = BaseSearchSchema.extend({
    sortBy: z
        .enum([
            "name",
            "description",
            "structure",
            "category",
            "quantity",
            "storageLocation",
            "createdAt",
            "updatedAt",
        ])
        .default("name"),
    searchBy: z
        .union([
            z.array(SearchFieldEnum), // array allows for multiple items selection
            SearchFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(), // output array of strings or a array with a single string
    category: z.enum(["sample", "reagent"]).optional(),
    storageLocation: z.string().optional(),
});

export type SampleSearch = z.infer<typeof SampleSearchSchema>;
