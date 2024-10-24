import { PrismaClient, Sample } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetches all samples from the database.
 * @returns {Promise<Array>} An array of samples.
 */
export const getAllSamples = async (): Promise<Array<Sample>> => {
    return prisma.sample.findMany();
};
