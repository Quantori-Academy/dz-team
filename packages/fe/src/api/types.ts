import { UserRole } from "./self";

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

export type NewUser = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
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
    unit: string;
    quantity: number;
    reagentIds: string[];
    storageLocation: string;
    storageId: string;
};


export type EditSampleData = {
    id: string;
    name: string;
    structure: string;
    description: string;
    unit: string;
    quantity: number;
    reagentIds: string[];
    storageLocation: string;
    storageId: string;
};

