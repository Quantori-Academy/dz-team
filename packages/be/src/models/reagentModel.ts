export enum Category {
    REAGENT = "REAGENT",
    SAMPLE = "SAMPLE",
}

export interface Reagent {
    id: number;
    name: string;
    category: Category;
    structure?: string;
    description?: string;
    quantity: number;
    unit: string;
    size?: number;
    expirationDate?: Date;
    storageLocation: string;
    cas?: string;
    producer?: string;
    catalogId?: string;
    catalogLink?: string;
    pricePerUnit?: number;
    createdAt: Date;
    updatedAt: Date;
}
