import z from "zod";

const SearchFieldEnum = z.enum([
    "name",
    "room",
    "structure",
    "cas",
    "producer",
    "catalogId",
    "catalogLink",
]);

export const CombinedListSearchSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortBy: z
        .enum([
            "id",
            "name",
            "description",
            "structure",
            "category",
            "quantity",
            "unit",
            "quantityInit",
            "status",
            "type",
            "expirationDate",
            "storageLocation",
            "cas",
            "producer",
            "catalogId",
            "catalogLink",
            "pricePerUnit",
            "currency",
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
    category: z.enum(["reagent", "sample"]).optional(),
    type: z
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
    status: z.enum(["available", "lowStock", "outOfStock", "ordered", "notAvailable"]).optional(),
    storageLocation: z.string().optional(),
});

export type CombinedListSearch = z.infer<typeof CombinedListSearchSchema>;
