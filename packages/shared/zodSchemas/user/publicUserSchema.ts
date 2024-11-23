import z from "zod";
import { UserSchema } from "../../generated/zod";

export const publicUserSchema = UserSchema.omit({ password: true });

export type PublicUserType = z.infer<typeof publicUserSchema>;
