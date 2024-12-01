import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

const StorageLocationFieldEnum = z.enum(["name", "room", "description"]);

// Define the StorageLocationSearch schema
export const StorageLocationSearchSchema = BaseSearchSchema.extend({
    sortBy: z.enum(["name", "room", "description", "createdAt", "updatedAt"]).default("name"),
    searchBy: z
        .union([
            z.array(StorageLocationFieldEnum), // Allows selection of multiple fields
            StorageLocationFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(), // Outputs an array with selected search fields
    room: z.string().optional(), // Optional room filter
    name: z.string().optional(), // Optional name filter
});

// Type inference for StorageLocationSearch
export type StorageLocationSearch = z.infer<typeof StorageLocationSearchSchema>;
