import { fetchAllSamples } from "../controllers/sampleController";
import { FastifyZodInstance } from "../types";

/**
 * Registers the sample routes.
 *
 * @param {FastifyZodInstance} app - The Fastify Zod instance to register routes on.
 * @returns {Promise<void>} A promise that resolves when the routes are registered.
 */
export const sampleRoutes = async (app: FastifyZodInstance): Promise<void> => {
    app.get("/", fetchAllSamples); // get all samples
};
