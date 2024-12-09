// External dependencies
import { FastifyZodInstance } from "../types";
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";

// Internal controllers
import { sampleController } from "../controllers/sampleController";

// Shared schemas
import { SampleSearchSchema } from "../../../shared/zodSchemas/samples/sampleSearchSchema";
import {
    SampleCreateSchema,
    SampleUpdateSchema,
} from "../../../shared/zodSchemas/samples/extendedSampleSchemas";

// OpenAPI response schemas
import {
    DELETE_SAMPLE_BY_ID_SCHEMA,
    GET_SAMPLE_BY_ID_SCHEMA,
    GET_SAMPLES_SCHEMA,
    PATCH_SAMPLE_BY_ID_SCHEMA,
    POST_SAMPLES_SCHEMA,
    PUT_SAMPLE_BY_ID_SCHEMA,
} from "../responseSchemas/samples";

/**
 * Registers the sample routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const sampleRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / endpoint to retrieve a list of samples.
     *
     * @name GetSamples
     * @function
     * @memberof module:routes
     * @param {SampleSearchSchema} request.query - The search parameters for filtering samples.
     * @param {Object} reply - The reply object.
     * @returns {Promise<Object>} The list of samples and metadata.
     */
    app.get<{ Querystring: typeof SampleSearchSchema }>(
        "/",
        {
            schema: GET_SAMPLES_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await sampleController.getSamples(request, reply);
        },
    );

    /**
     * @route GET /:id
     * @tags Sample
     * @summary Get a specific sample by ID.
     * @param {string} id.params.required - Sample ID
     * @returns {Sample} 200 - The requested sample
     * @returns {Error} 404 - Sample not found
     */
    app.get<{ Params: { id: string } }>(
        "/:id",
        {
            schema: GET_SAMPLE_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await sampleController.getSample(request, reply);
        },
    );

    /**
     * @route POST /
     * @tags Sample
     * @summary Create a new sample.
     * @param {SampleCreateInputSchema} request.body.required - Sample data to create
     * @returns {Sample} 201 - The created sample
     * @returns {Error} 400 - Validation error
     */
    app.post<{ Body: typeof SampleCreateSchema }>(
        "/",
        {
            schema: POST_SAMPLES_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await sampleController.createSample(request, reply);
        },
    );

    /**
     * @route PUT /:id
     * @tags Sample
     * @summary Update an existing sample by ID.
     * @param {string} id.params.required - Sample ID
     * @param {SampleUpdateSchema} request.body.required - Data to update the sample
     * @returns {Sample} 200 - The updated sample
     * @returns {Error} 404 - Sample not found
     * @returns {Error} 400 - Validation error
     */
    app.put<{ Params: { id: string }; Body: typeof SampleUpdateSchema }>(
        "/:id",
        {
            schema: PUT_SAMPLE_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await sampleController.updateSample(request, reply);
        },
    );

    /**
     * @route DELETE /:id
     * @tags Sample
     * @summary Soft delete a sample by ID.
     * @param {string} id.params.required - Sample ID
     * @returns {Sample} 200 - The deleted sample
     * @returns {Error} 404 - Sample not found
     */
    app.delete<{ Params: { id: string } }>(
        "/:id",
        {
            schema: DELETE_SAMPLE_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await sampleController.deleteSample(request, reply);
        },
    );

    /**
     * @route PATCH /:id
     * @tags Sample
     * @summary Undo the soft delete of a sample by ID.
     * @param {string} id.params.required - Sample ID
     * @returns {Sample} 200 - The restored sample
     * @returns {Error} 404 - Sample not found
     */
    app.patch<{ Params: { id: string } }>(
        "/:id",
        {
            schema: PATCH_SAMPLE_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await sampleController.undoDeleteSample(request, reply);
        },
    );
};
