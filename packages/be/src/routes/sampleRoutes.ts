import { FastifyInstance } from "fastify";

import { fetchAllSamples } from "../controllers/sampleController";

/**
 * Registers the sample routes.
 *
 * @param {FastifyInstance} app - The Fastify instance to register routes on.
 * @returns {Promise<void>} A promise that resolves when the routes are registered.
 */
export const sampleRoutes = async (app: FastifyInstance): Promise<void> => {
    app.get("/", fetchAllSamples); // get all samples
};
