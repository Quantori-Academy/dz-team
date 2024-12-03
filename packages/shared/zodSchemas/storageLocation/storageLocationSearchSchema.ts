import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

const StorageLocationFieldEnum = z.enum(["name", "room", "description"]);

// Define the StorageLocationSearch schema
export const StorageLocationSearchSchema = BaseSearchSchema.extend({
    // Field by which the results will be sorted.
    sortBy: z
        .enum(["name", "room", "description", "createdAt", "updatedAt"])
        .default("name")
        .describe("The field to sort results by. Default is 'name'."),

    // Fields to limit the search scope (can be a single field or multiple fields).
    searchBy: z
        .union([
            z.array(StorageLocationFieldEnum), // Allows selection of multiple fields
            StorageLocationFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional()
        .describe("Specific fields to search within. Can be a single field or an array of fields."),

    // Filter results by room name or ID.
    room: z.string().optional().describe("Filter results by room name or identifier."),

    // Filter results by the storage location's name.
    name: z.string().optional().describe("Filter results by the name of the storage location."),
});

// Type inference for StorageLocationSearch
export type StorageLocationSearch = z.infer<typeof StorageLocationSearchSchema>;
