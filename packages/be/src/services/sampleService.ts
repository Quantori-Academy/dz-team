import { Sample } from "@prisma/client";
import { prisma } from "../utils/prisma";

/**
 * Fetches all samples from the database.
 * @returns {Promise<Array>} An array of samples.
 */
export const getAllSamples = async (): Promise<Array<Sample>> => {
    return prisma.sample.findMany();
};
