import { z } from "zod";

// ReagentRequest Creation Schema
export const RequestCreationBodySchema = z.object({
    name: z.string().min(1, "Reagent name is required"),
    structure: z.string().optional(), // Allow structure to be optional
    cas: z.string().optional(),
    quantity: z.number().positive("Quantity must be positive"),
    unit: z.enum(["ml", "l", "mg", "g", "oz", "lb"]),
    status: z.enum(["pending", "ordered", "declined", "completed"]).default("pending"),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    userId: z.string().uuid(),
    orderId: z.string().uuid().optional(),
});

// Request Update Schema
export const RequestUpdateBodySchema = z.object({
    name: z.string().optional(),
    structure: z.string().optional(),
    cas: z.string().optional(),
    quantity: z.number().positive("Quantity must be positive").optional(),
    unit: z.enum(["ml", "l", "mg", "g", "oz", "lb"]).optional(),
    userComment: z.string().optional(),
    status: z.enum(["pending", "ordered", "declined", "completed"]).optional(),
    updatedAt: z.coerce.date().optional(),
});

// Comment Request Schema
export const CommentRequestBodySchema = z.object({
    comment: z.string().min(1, "Comment is required"),
});

// Status Update Schema
export const StatusUpdateBodySchema = z.object({
    status: z.enum(["pending", "ordered", "declined", "completed"]),
});

// Type Inferences
export type RequestCreationBody = z.infer<typeof RequestCreationBodySchema>;
export type RequestUpdateBody = z.infer<typeof RequestUpdateBodySchema>;
export type CommentRequestBody = z.infer<typeof CommentRequestBodySchema>;
export type StatusUpdateBody = z.infer<typeof StatusUpdateBodySchema>;
