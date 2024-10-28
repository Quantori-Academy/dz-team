import { Literal, Record, Static, Union } from "runtypes";

import { base, request } from "./request";

export enum UserRole {
    admin = "admin",
    procurementOfficer = "procurementOfficer",
    researcher = "researcher",
}

export const UserContract = Record({
    role: Union(
        Literal(UserRole.admin),
        Literal(UserRole.procurementOfficer),
        Literal(UserRole.researcher),
    ),
});

export type SelfType = Static<typeof UserContract>;

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
