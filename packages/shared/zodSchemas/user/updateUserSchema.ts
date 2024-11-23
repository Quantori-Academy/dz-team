import { z } from "zod";

export const updateUserSchema = z.object({
    id: z
        .string()
        .min(1, {
            message: "Id is required.",
        })
        .optional(),
    firstName: z
        .string()
        .min(1, {
            message: "First name is required.",
        })
        .optional(), // Optional for partial updates
    lastName: z
        .string()
        .min(1, {
            message: "Last name is required.",
        })
        .optional(),
    email: z
        .string()
        .email({
            message: "Invalid email format.",
        })
        .optional(),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters long.",
        })
        .optional(),
    role: z
        .enum(["admin", "researcher", "procurementOfficer"], {
            message: "Role must be either admin, researcher, or procurementOfficer.",
        })
        .optional(),
});

// Type inference for UpdateUser
export type UpdateUser = z.infer<typeof updateUserSchema>;
