import { z } from "zod";

export const reagentSchema = z.object({
    name: z.string().min(4, "Reagent name is required"),
    category: z.enum(["REAGENT", "SAMPLE"]),
    structure: z.string().min(1, "Chemical structure is required"),
    description: z.string().optional(), // Optional since you may want to allow reagents without a description
    quantityLeft: z.number().min(0, "Quantity of reagents must be a positive number"),
    unit: z.string().min(1, "Unit of measurement is required"), // Added validation for unit
    size: z.number().optional(), // Optional size
    expirationDate: z.date().optional(), // Optional expiration date
    storageLocation: z.string().min(3, "Storage location is required"),
    casNumber: z.string().optional(), // Optional CAS number
    producer: z.string().optional(), // Optional producer
    catalogId: z.string().optional(), // Optional catalog ID
    catalogLink: z.string().url().optional(), // Optional catalog link, must be a valid URL
    pricePerUnit: z.number().optional(), // Optional price per unit
});
