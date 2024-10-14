import { fetchAllReagents } from "../controllers/reagentController";
import { FastifyZodInstance } from "../types";

/**
 * Registers the reagent routes.
 *
 * @param {FastifyZodInstance} app - The Fastify Zod instance to register routes on.
 * @returns {Promise<void>} A promise that resolves when the routes are registered.
 */
export const reagentRoutes = async (app: FastifyZodInstance): Promise<void> => {
    app.get("/", fetchAllReagents); // get all reagents
};
