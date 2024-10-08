import { PrismaClient, Reagent } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetches all reagents from the database.
 * @returns {Promise<Array>} An array of reagents.
 */
export const getAllReagents = async (): Promise<Array<Reagent>> => {
    return prisma.reagent.findMany();
};
