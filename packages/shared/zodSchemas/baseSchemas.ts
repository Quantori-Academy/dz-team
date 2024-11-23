import { z } from "zod";

export const idSchema = z.string().uuid();

export type IdType = z.infer<typeof idSchema>;

export const BaseSearchSchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
});
