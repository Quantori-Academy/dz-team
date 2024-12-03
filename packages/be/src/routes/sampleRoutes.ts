import { FastifyZodInstance } from "../types";

import {
    SampleCreateInputSchema,
    SampleUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { SampleSearchSchema } from "../../../shared/zodSchemas/samples/sampleSearchSchema";

import { sampleController } from "../controllers/sampleController";

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
        { schema: { tags: ["Sample"] } },
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
        { schema: { tags: ["Sample"] } },
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
    app.post<{ Body: typeof SampleCreateInputSchema }>(
        "/",
        { schema: { tags: ["Sample"], body: SampleCreateInputSchema } },
        async (request, reply) => {
            return await sampleController.createSample(request, reply);
        },
    );

    /**
     * @route PUT /:id
     * @tags Sample
     * @summary Update an existing sample by ID.
     * @param {string} id.params.required - Sample ID
     * @param {SampleUpdateInputSchema} request.body.required - Data to update the sample
     * @returns {Sample} 200 - The updated sample
     * @returns {Error} 404 - Sample not found
     * @returns {Error} 400 - Validation error
     */
    app.put<{ Params: { id: string }; Body: typeof SampleUpdateInputSchema }>(
        "/:id",
        { schema: { tags: ["Sample"], body: SampleUpdateInputSchema } },
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
        { schema: { tags: ["Sample"] } },
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
        { schema: { tags: ["Sample"] } },
        async (request, reply) => {
            return await sampleController.undoDeleteSample(request, reply);
        },
    );
};
