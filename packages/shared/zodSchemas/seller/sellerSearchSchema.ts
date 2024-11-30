import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

const SellerFieldEnum = z.enum(["name"]);

// Define the SellerSearchSchema
export const SellerSearchSchema = BaseSearchSchema.extend({
    sortBy: z.enum(["name"]).default("name"),
    searchBy: z
        .union([
            z.array(SellerFieldEnum), // Allows selection of multiple fields
            SellerFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(), // Outputs an array with selected search fields
    name: z.string().optional(),
});

// Type inference for SellerSearchSchema
export type SellerSearch = z.infer<typeof SellerSearchSchema>;
