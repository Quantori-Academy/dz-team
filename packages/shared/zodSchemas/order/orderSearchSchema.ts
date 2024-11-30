import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

const OrderFieldEnum = z.enum([
    "title",
    "status",
    "createdAt",
    "updatedAt",
    "description",
    "seller",
]);

// Define the OrderSearch schema with additional optional fields
export const OrderSearchSchema = BaseSearchSchema.extend({
    sortBy: z
        .enum(["title", "description", "seller", "createdAt", "updatedAt"])
        .default("createdAt"),
    status: z.enum(["pending", "submitted", "fulfilled", "canceled"]).optional(),
    searchBy: z
        .union([
            z.array(OrderFieldEnum), // Allows selection of multiple fields
            OrderFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(), // Outputs an array with selected search fields
});

// Type inference for OrderSearch
export type OrderSearch = z.infer<typeof OrderSearchSchema>;
