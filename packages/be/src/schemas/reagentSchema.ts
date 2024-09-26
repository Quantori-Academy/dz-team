import { z } from "zod";

export const reagentSchema = z.object({
    name: z.string().min(4, "Reagent name is required"),
    category: z.enum(["REAGENT", "SAMPLE"]),
    structure: z.string().min(1, "Chemical structure is required"),
    description: z.string(),
    quantityLeft: z.number().min(0, "Quantity of reagents must be a positive number"),
    storageLocation: z.string().min(3, "Storage location is required"),
});
