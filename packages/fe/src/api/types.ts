import { CombinedList } from "shared/generated/zod/modelSchema/CombinedListSchema";

export type ResponseMaterial = {
    id: string;
    name: string;
    desc?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
};

export type ResponseUser = {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    role: "Admin" | "Procurement Officer" | "Researcher";
};
export type NewStorage = {
    name: string;
    room: string;
    description: string;
};

export type SampleData = {
    name: string;
    structure: string;
    description: string;
    quantityUnit: string;
    quantity: number;
    quantityLeft: number;
    reagentsUsed: CombinedList[];
    expirationDate: string;
    storageLocation: string;
    storageId: string;
};
