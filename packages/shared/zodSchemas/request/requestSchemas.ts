import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

// Request Search Field Enum
const RequestFieldEnum = z.enum(["name", "cas", "structure", "createdAt", "updatedAt"]);

// Request Search Schema
export const RequestSearchSchema = BaseSearchSchema.extend({
    sortBy: RequestFieldEnum.default("createdAt").describe(
        "The field by which the results should be sorted. Default is 'createdAt'.",
    ),
    searchBy: z
        .union([z.array(RequestFieldEnum), RequestFieldEnum])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional()
        .describe("Fields to search by. Can be a single value or an array of values."),
    status: z
        .enum(["pending", "ordered", "declined", "fulfilled"])
        .optional()
        .describe(
            "Filter requests by status. Options include 'pending', 'ordered', 'declined', 'fulfilled'.",
        ),
});

export type RequestSearch = z.infer<typeof RequestSearchSchema>;

export const RequestCreationBodySchema = z.object({
    name: z.string().min(1, "Reagent name is required"),
    structure: z.string().optional(),
    cas: z.string().optional(),
    quantity: z.number().positive("Quantity must be positive"),
    unit: z.enum(["ml", "l", "mg", "g", "oz", "lb"]),
    status: z.enum(["pending", "ordered", "declined", "fulfilled"]).default("pending"),
    orderId: z.string().uuid().optional().nullable(),
});

export const RequestUpdateBodySchema = z.object({
    name: z.string().optional(),
    structure: z.string().optional(),
    cas: z.string().optional(),
    quantity: z.number().positive().optional(),
    unit: z.enum(["ml", "l", "mg", "g", "oz", "lb"]).optional(),
    comment: z.string().optional(),
    status: z.enum(["pending", "ordered", "declined", "fulfilled"]).optional(),
    updatedAt: z.coerce.date().optional(),
});

export const CommentRequestBodySchema = z.object({
    comment: z.string().min(1, "Comment is required"),
});

export type RequestCreationBody = z.infer<typeof RequestCreationBodySchema>;
export type RequestUpdateBody = z.infer<typeof RequestUpdateBodySchema>;
export type CommentRequestBody = z.infer<typeof CommentRequestBodySchema>;

// Search Results Type
export type RequestSearchResults = {
    data: any[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};
