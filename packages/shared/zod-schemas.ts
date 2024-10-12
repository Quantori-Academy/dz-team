import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type User = z.infer<typeof userSchema>;

export const moleculeSchema = z.object({
    smiles: z.string(),
});

export type Molecule = z.infer<typeof moleculeSchema>;
