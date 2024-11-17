import { z } from "zod";

const StorageLocationFieldEnum = z.enum(["name", "room", "description"]);

// Define the StorageLocationSearch schema
export const StorageLocationSearchSchema = z.object({
    // General search query string (used for searching across all relevant fields).
    query: z.string().optional().describe("A general search term to filter storage locations."),

    // The page number for paginated results.
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1)
        .describe("The page number for pagination. Default is 1."),

    // The number of items to display per page (with a maximum limit of 100).
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .default(10)
        .describe("The number of results per page. Default is 10, max is 100."),

    // Field by which the results will be sorted.
    sortBy: z
        .enum(["name", "room", "description", "createdAt", "updatedAt"])
        .default("name")
        .describe("The field to sort results by. Default is 'name'."),

    // Order in which results will be sorted (ascending or descending).
    sortOrder: z
        .enum(["asc", "desc"])
        .default("asc")
        .describe(
            "The sort order, either 'asc' for ascending or 'desc' for descending. Default is 'asc'.",
        ),

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
