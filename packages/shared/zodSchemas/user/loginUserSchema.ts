import { z } from "zod";

export const loginUserSchema = z.object({
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
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});

export type LoginUser = z.infer<typeof loginUserSchema>;
