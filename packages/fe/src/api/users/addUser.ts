import { z } from "zod";

import { base, request } from "../request";
import { User } from "./getUsers";

const _AddUser = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    role: z.enum(["admin", "researcher", "procurementOfficer"]),
});

export type NewUser = z.infer<typeof _AddUser>;

export const PostUsers = async (userData: NewUser) => {
    await request(`${base}/api/v1/users`, User, {
        method: "POST",
        json: userData,
    });
};
