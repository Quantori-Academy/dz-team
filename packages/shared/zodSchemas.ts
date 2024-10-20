import { z } from "zod";
import userSchema from "./generated/zod/modelSchema/UserSchema";

export const idSchema = z.string().uuid();

// New registration schema that includes confirmPassword
export const registerUserSchema = z
    .object({
        id: z
            .string()
            .uuid({
                message: "Invalid UUID format for ID.",
            })
            .optional(), // Make id optional
        username: z
            .string()
            .min(1, {
                message: "Username is required.",
            })
            .max(50, {
                message: "Username must not exceed 50 characters.",
            })
            .refine((val) => val.trim() !== "", {
                message: "Username cannot be empty.",
            }),
        firstName: z.string().min(1, {
            message: "First name is required.",
        }),
        lastName: z.string().min(1, {
            message: "Last name is required.",
        }),
        email: z.string().email({
            message: "Invalid email format.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters long.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Confirm password must be at least 8 characters long.",
        }),
        role: z.enum(["admin", "researcher", "procurementOfficer"], {
            message: "Role must be either admin, researcher  or procurementOfficer.",
        }),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"], // Points the error to the confirmPassword field
    });

export type User = z.infer<typeof userSchema>;

// Type inference for RegisterUser
export type RegisterUser = z.infer<typeof registerUserSchema>;
