import { z } from "zod";

export const UserScalarFieldEnumSchema = z.enum([
    "id",
    "username",
    "firstName",
    "lastName",
    "email",
    "password",
    "role",
    "createdAt",
    "updatedAt",
]);

export default UserScalarFieldEnumSchema;
