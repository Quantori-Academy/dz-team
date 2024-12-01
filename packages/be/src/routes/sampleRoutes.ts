import { fetchAllSamples } from "../controllers/sampleController";
import { FastifyZodInstance } from "../types";
import { GET_SAMPLES_SCHEMA } from "../responseSchemas/samples";
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";

/**
 * Registers the sample routes.
 *
 * @param {FastifyZodInstance} app - The Fastify Zod instance to register routes on.
 * @returns {Promise<void>} A promise that resolves when the routes are registered.
 */

export const sampleRoutes = async (app: FastifyZodInstance): Promise<void> => {
    app.get(
        "/",
        {
            schema: GET_SAMPLES_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        fetchAllSamples,
    ); // get all samples
};
