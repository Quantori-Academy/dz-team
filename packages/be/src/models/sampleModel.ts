import { Reagent } from "@prisma/client";

export interface Sample {
    id: number;
    title: string;
    description?: string;
    structure?: string;
    initialQuantity: number;
    unit: string;
    createdAt: Date;
    updatedAt: Date;
    reagents?: Reagent[];
}
