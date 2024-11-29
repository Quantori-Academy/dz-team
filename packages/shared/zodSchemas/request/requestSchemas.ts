import { z } from "zod";

// ReagentRequest Creation Schema
export const RequestCreationBodySchema = z.object({
    name: z.string().min(1, "Reagent name is required"),
    structure: z.string().optional(),
    cas: z.string().optional(),
    quantity: z.number().positive("Quantity must be positive"),
    unit: z.enum(["ml", "l", "mg", "g", "oz", "lb"]),
    status: z.enum(["pending", "ordered", "declined", "fulfilled"]).default("pending"),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    userId: z.string().uuid(),
    orderId: z.string().uuid().optional().nullish(),
});

// Request Update Schema
export const RequestUpdateBodySchema = z.object({
    name: z.string().optional(),
    structure: z.string().optional(),
    cas: z.string().optional(),
    quantity: z.number().positive().optional(),
    unit: z.enum(["ml", "l", "mg", "g", "oz", "lb"]).optional(),
    comment: z.string().optional(),
    status: z.enum(["pending", "ordered", "declined", "fulfilled"]).optional(),
    updatedAt: z.coerce.date().optional(), // If this needs to be Date, handle it below
});

// Comment Request Schema
export const CommentRequestBodySchema = z.object({
    comment: z.string().min(1, "Comment is required"),
});

// Base Search Schema
export const BaseSearchSchema = z.object({
    query: z.string().optional(),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).default(10),
});

// Request Search Schema
const RequestFieldEnum = z.enum(["name", "cas", "structure", "createdAt", "updatedAt"]);

export const RequestSearchSchema = BaseSearchSchema.extend({
    sortBy: RequestFieldEnum.default("createdAt"),
    status: z.enum(["pending", "ordered", "declined", "fulfilled"]).optional(),
    searchBy: z
        .union([z.array(RequestFieldEnum), RequestFieldEnum])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(),
});

export type RequestCreationBody = z.infer<typeof RequestCreationBodySchema>;
export type RequestUpdateBody = z.infer<typeof RequestUpdateBodySchema>;
export type CommentRequestBody = z.infer<typeof CommentRequestBodySchema>;
export type RequestSearch = z.infer<typeof RequestSearchSchema>;

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
