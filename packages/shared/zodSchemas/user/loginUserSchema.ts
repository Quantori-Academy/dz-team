import "zod-openapi/extend";
import { z } from "zod";

export const loginUserSchema = z
    .object({
        username: z
            .string()
            .min(1, {
                message: "Username is required.",
            })
            .max(50, {
                message: "Username must not exceed 50 characters.",
            })
            .describe("The username of the user")
            .refine((val) => val.trim() !== "", {
                message: "Username cannot be empty.",
            })
            .openapi({ description: "Username", example: "admin" }),
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters long.",
            })
            .describe("The user's password")
            .openapi({ description: "User password", example: "password" }),
    })
    .openapi({ ref: "UserLogin" });

export type LoginUser = z.infer<typeof loginUserSchema>;
