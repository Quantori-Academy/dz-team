export enum Category {
    REAGENT = "REAGENT",
    SAMPLE = "SAMPLE",
}

export interface Reagent {
    id: number;
    name: string;
    category: Category;
    structure: string;
    description?: string;
    quantityLeft: number;
    unit: string;
    size?: number;
    expirationDate?: Date;
    storageLocation: string;
    casNumber?: string;
    producer?: string;
    catalogId?: string;
    catalogLink?: string;
    pricePerUnit?: number;
    createdAt: Date;
    updatedAt: Date;
}
