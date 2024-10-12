import { FastifyInstance } from "fastify";

import { fetchAllReagents } from "../controllers/reagentController";

/**
 * Registers the reagent routes.
 *
 * @param {FastifyInstance} app - The Fastify instance to register routes on.
 * @returns {Promise<void>} A promise that resolves when the routes are registered.
 */
export const reagentRoutes = async (app: FastifyInstance): Promise<void> => {
    app.get("/", fetchAllReagents); // get all reagents
};
