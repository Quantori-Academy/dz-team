import { z } from "zod";
import userSchema from "../generated/zod/modelSchema/UserSchema";

export const idSchema = z.string().uuid();

export const BaseSearchSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
});
export type User = z.infer<typeof userSchema>;
