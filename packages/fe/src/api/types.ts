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

export type SampleData = {
    name: string;
    structure: string;
    description: string;
    quantityUnit: string;
    quantity: number;
    quantityLeft: number;
    reagentsUsed: string[];
    expirationDate: string;
    storageLocation: string;
};
