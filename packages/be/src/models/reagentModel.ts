export interface Reagent {
    id: number;
    name: string;
    category: Category;
    structure: string;
    description: string;
    quantityLeft: number;
    storageLocation: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum Category {
    REAGENT = "REAGENT",
    SAMPLE = "SAMPLE",
}
