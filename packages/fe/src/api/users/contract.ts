import { z } from "zod";

export const CurrentUserContract = z.object({
    id: z.string(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    lastLoginDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type CurrentUser = z.infer<typeof CurrentUserContract>;
