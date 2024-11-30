import { UserSchema } from "../../generated/zod";

export const publicUserSchema = UserSchema.omit({ password: true });
