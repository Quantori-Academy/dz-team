import { z } from "zod";
import { BaseSearchSchema } from "../baseSchemas";

const UserFieldEnum = z.enum(["firstName", "lastName", "username", "email", "role", "createdAt"]);

// Define the UserSearch schema
export const UserSearchSchema = BaseSearchSchema.extend({
    sortBy: z
        .enum(["firstName", "lastName", "username", "email", "role", "createdAt", "updatedAt"])
        .default("username"),
    searchBy: z
        .union([
            z.array(UserFieldEnum), // Allows selection of multiple fields
            UserFieldEnum,
        ])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .optional(), // Outputs an array with selected search fields

    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string().optional(),
    role: z.enum(["admin", "procurementOfficer", "researcher"]).optional(),
});

// Type inference for UserSearch
export type UserSearch = z.infer<typeof UserSearchSchema>;
