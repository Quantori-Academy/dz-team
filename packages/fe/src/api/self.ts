import { z } from "zod";

import { base, request } from "./request";

export enum UserRole {
    admin = "admin",
    procurementOfficer = "procurementOfficer",
    researcher = "researcher",
}

export const UserContract = z.object({
    role: z.nativeEnum(UserRole),
});

export type SelfType = z.infer<typeof UserContract>;

export const getUser = async ({ token, userId }: { token: string; userId: string }) => {
    const response = await request(`${base}/api/v1/users/${userId}`, UserContract, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        showErrorNotification: true,
        shouldAffectIsLoading: true,
    });

    if (!response) throw new Error("Failed to get user role");
    return response;
};
