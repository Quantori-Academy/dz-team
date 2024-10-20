import { z } from "zod";

export const idSchema = z.string().uuid();

const SearchFieldEnum = z.enum([
    "name",
    "description",
    "structure",
    "cas",
    "producer",
    "catalogId",
    "catalogLink",
]);

// THIS SCHEMA IS USED TILL REPLACEMENT IS FOUND IN AUTOGENERATED SCHEMAS
export const ReagentSearchSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortBy: z
        .enum([
            "name",
            "description",
            "structure",
            "category",
            "quantity",
            "status",
            "expirationDate",
            "storageLocation",
            "cas",
            "producer",
            "catalogId",
            "catalogLink",
            "pricePerUnit",
            "createdAt",
            "updatedAt",
        ])
        .default("name"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
    searchBy: z
        .union([
            z.array(SearchFieldEnum), // array allows for multiple items selection
            SearchFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(), // output array of strings or a array with a single string
    category: z
        .enum([
            "organic",
            "inorganic",
            "acidic",
            "basic",
            "oxidizing",
            "reducing",
            "precipitating",
            "complexing",
            "indicator",
            "other",
        ])
        .optional(),
    status: z
        .enum(["available", "low_stock", "out_of_stock", "ordered", "not_available"])
        .optional(),
    storageLocation: z.string().optional(),
});

export type ReagentSearch = z.infer<typeof ReagentSearchSchema>;

// TO BE REMOVED
export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type User = z.infer<typeof userSchema>;
// **************
