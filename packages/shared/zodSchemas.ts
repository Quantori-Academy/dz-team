import { z } from "zod";
import userSchema, { UserSchema } from "./generated/zod/modelSchema/UserSchema";

export const idSchema = z.string().uuid();

const SearchFieldEnum = z.enum([
    "name",
    "description",
    "room",
    "structure",
    "cas",
    "producer",
    "catalogId",
    "catalogLink",
]);

// THIS SCHEMA IS USED TILL REPLACEMENT IS FOUND IN AUTOGENERATED SCHEMAS
export const ReagentSearchSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortBy: z
        .enum([
            "name",
            "description",
            "structure",
            "category",
            "quantity",
            "status",
            "expirationDate",
            "storageLocation",
            "cas",
            "producer",
            "catalogId",
            "catalogLink",
            "pricePerUnit",
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
    category: z.enum(["sample", "reagent"]).optional(),
    status: z.enum(["available", "lowStock", "outOfStock", "ordered", "notAvailable"]).optional(),
    storageLocation: z.string().optional(),
});

export type ReagentSearch = z.infer<typeof ReagentSearchSchema>;

// Enum for searchable fields in storage location search
const StorageLocationFieldEnum = z.enum(["name", "room", "description"]);

// Define the StorageLocationSearch schema
export const StorageLocationSearchSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortBy: z.enum(["name", "room", "description", "createdAt", "updatedAt"]).default("name"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
    searchBy: z
        .union([
            z.array(StorageLocationFieldEnum), // Allows selection of multiple fields
            StorageLocationFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(), // Outputs an array with selected search fields
    room: z.string().optional(), // Optional room filter
    name: z.string().optional(), // Optional name filter
});

// Type inference for StorageLocationSearch
export type StorageLocationSearch = z.infer<typeof StorageLocationSearchSchema>;

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

// Define the login schema
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

export type User = z.infer<typeof userSchema>;

// Type inference for RegisterUser
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;

export const updateUserSchema = z.object({
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

export const publicUserSchema = UserSchema.omit({ password: true });
