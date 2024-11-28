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
    role: string;
};
export type NotificationTypes = {
    message: string;
    type: "error" | "success";
    open: boolean;
};
