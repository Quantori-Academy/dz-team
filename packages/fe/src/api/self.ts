import { Record, Static, String } from "runtypes";

import { base, request } from "./request";

export enum UserRole {
    admin = "admin",
    procurementOfficer = "procurementOfficer",
    researcher = "researcher",
}

export const UserContract = Record({
    role: String,
});

export type UserType = Static<typeof UserContract>;

export const getUser = async (token: string) => {
    const response = await request(`${base}/api/v1/self`, UserContract, {
        method: "GET", // TODO: pass auth token when it's merged
        headers: { Authorization: token },
        showErrorNotification: true,
        shouldAffectIsLoading: true,
    });

    if (!response) throw new Error("Failed to get user role");
    return response;
};
