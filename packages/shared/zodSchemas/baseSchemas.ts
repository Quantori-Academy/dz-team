import { z } from "zod";
import userSchema from "../generated/zod/modelSchema/UserSchema";

export const idSchema = z.string().uuid();

export type IdType = z.infer<typeof idSchema>;

export const BaseSearchSchema = z.object({
    query: z.string().optional().describe("A search query to filter by name, description, etc."),

    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1)
        .describe("The page number for pagination. Default is 1."),
    sortOrder: z
        .enum(["asc", "desc"])
        .default("asc")
        .describe(
            "The sort order, either 'asc' for ascending or 'desc' for descending. Default is 'asc'.",
        ),
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .default(10)
        .describe("The number of results per page. Max is 100. Default is 10."),
});
export type User = z.infer<typeof userSchema>;
