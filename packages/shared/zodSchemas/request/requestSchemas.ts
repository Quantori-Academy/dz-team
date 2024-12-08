import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

const RequestFieldEnum = z.enum([
    "name",
    "cas",
    "structure",
    "createdAt",
    "updatedAt",
    "quantity",
    "unit",
    "status",
    "commentsUser",
    "commentsProcurement",
]);
const RequestStatusEnum = z.enum(["pending", "ordered", "declined", "fulfilled"]);

export const RequestSearchSchema = BaseSearchSchema.extend({
    sortBy: z
        .enum(["name", "cas", "structure", "createdAt", "updatedAt", "quantity", "unit", "status"])
        .default("createdAt")
        .describe("The field by which the results should be sorted. Default is 'createdAt'."),
    status: RequestStatusEnum.optional().describe(
        "Filter requests by status. Options include 'pending', 'ordered', 'declined', 'fulfilled'.",
    ),
    searchBy: z
        .union([z.array(RequestFieldEnum), RequestFieldEnum])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional()
        .describe("Fields to search by. Can be a single value or an array of values."),
});

export type RequestSearch = z.infer<typeof RequestSearchSchema>;

export const RequestCreationBodySchema = z.object({
    name: z.string().min(1, "Reagent name is required"),
    structure: z.string().nullable().optional(),
    cas: z.string().nullable().optional(),
    quantity: z.number().positive("Quantity must be positive"),
    unit: z.string().default("ml"), // Changed to string
    commentsUser: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(),
    status: RequestStatusEnum.default("pending"),
    orderId: z.string().uuid().nullable().optional(),
});

export const RequestUpdateBodySchema = z.object({
    name: z.string().optional(),
    structure: z.string().nullable().optional(),
    cas: z.string().nullable().optional(),
    quantity: z.number().positive().optional(),
    unit: z.string().optional(), // unit as string
    commentsUser: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(),
    commentsProcurement: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(),
    status: RequestStatusEnum.optional(),
    updatedAt: z.coerce.date().optional(),
});

// export const CommentRequestBodySchema = z.object({
//     comment: z.string().min(1, "Comment is required"),
// });

export type RequestCreationBody = z.infer<typeof RequestCreationBodySchema>;
export type RequestUpdateBody = z.infer<typeof RequestUpdateBodySchema>;
// export type CommentRequestBody = z.infer<typeof CommentRequestBodySchema>;

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
