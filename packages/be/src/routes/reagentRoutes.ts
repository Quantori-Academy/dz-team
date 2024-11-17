import { ReagentController } from "../controllers/reagentController";
import { FastifyZodInstance } from "../types";
import {
    DELETE_REAGENT_BY_ID_SCHEMA,
    GET_REAGENT_BY_ID_SCHEMA,
    GET_REAGENTS_SCHEMA,
    PATCH_REAGENT_BY_ID_SCHEMA,
    POST_REAGENTS_SCHEMA,
    PUT_REAGENT_BY_ID_SCHEMA,
} from "../responseSchemas/reagents";
import { FastifyZodOpenApiSchema, FastifyZodOpenApiTypeProvider } from "fastify-zod-openapi";
import ReagentCreateManyInputSchema from "shared/generated/zod/inputTypeSchemas/ReagentCreateManyInputSchema";
import { ReagentSearch } from "shared/zodSchemas/reagent/reagentSearchSchema";
import { ReagentUpdateManyMutationInputSchema } from "shared/generated/zod";

const reagentController = new ReagentController();

/**
 * Registers the reagent routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const reagentRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / endpoint to retrieve a list of reagents.
     *
     * @name GetReagents
     * @function
     * @memberof module:routes
     * @param {import("shared/zodSchemas/reagent/reagentSearchSchema").ReagentSearch} request.query - The search parameters for filtering reagents.
     * @param {Object} reply - The reply object.
     * @returns {Promise<Object>} The list of reagents and metadata.
     * @throws {Error} Throws an error if there is an issue retrieving reagents.
     *
     * @typedef {Object} ReagentSearch
     * @property {number} [page] - The page number for pagination.
     * @property {number} [limit] - The number of results per page.
     * @property {string} [sortBy] - The field to sort the results by.
     * @property {"asc" | "desc"} [sortOrder] - The order to sort the results.
     * @property {string} [category] - The category of reagents to filter by.
     * @property {string} [status] - The status of reagents to filter by.
     * @property {string} [storageLocation] - The storage location to filter by.
     * @property {string} [query] - A search query to filter results.
     *
     * @example
     * // Example query
     * GET /?page=1&limit=20&sortBy=name&sortBy=structure&sortOrder=asc
     */
    app.withTypeProvider<FastifyZodOpenApiTypeProvider>().get<{ Querystring: ReagentSearch }>(
        "/",
        {
            schema: GET_REAGENTS_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await reagentController.getReagents(request, reply);
        },
    );

    /**
     * @route GET /:id
     * @tags Reagent
     * @summary Get a specific reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @returns {Reagent} 200 - The requested reagent
     * @returns {Error} 404 - Reagent not found
     */
    app.get<{ Params: { id: string } }>(
        "/:id",
        { schema: GET_REAGENT_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema },
        async (request, reply) => {
            return await reagentController.getReagent(request, reply);
        },
    );

    /**
     * @route POST /
     * @tags Reagent
     * @summary Create a new reagent.
     * @param {ReagentSchema} request.body.required - Reagent data to create
     * @returns {Reagent} 201 - The created reagent
     * @returns {Error} 400 - Validation error
     */
    app.post<{ Body: typeof ReagentCreateManyInputSchema }>(
        "/",
        {
            schema: POST_REAGENTS_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await reagentController.createReagent(request, reply);
        },
    );

    /**
     * @route PUT /:id
     * @tags Reagent
     * @summary Update an existing reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @param {ReagentUpdateManyMutationInputSchema} request.body.required - Data to update the reagent
     * @returns {Reagent} 200 - The updated reagent
     * @returns {Error} 404 - Reagent not found
     * @returns {Error} 400 - Validation error
     */
    app.put<{ Params: { id: string }; Body: typeof ReagentUpdateManyMutationInputSchema }>(
        "/:id",
        { schema: PUT_REAGENT_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema },
        async (request, reply) => {
            return await reagentController.updateReagent(request, reply);
        },
    );

    /**
     * @route DELETE /:id
     * @tags Reagent
     * @summary Soft delete a reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @returns {Reagent} 200 - The deleted reagent
     * @returns {Error} 404 - Reagent not found
     */
    app.delete<{ Params: { id: string } }>(
        "/:id",
        { schema: DELETE_REAGENT_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema },
        async (request, reply) => {
            return await reagentController.deleteReagent(request, reply);
        },
    );

    /**
     * @route PATCH /:id
     * @tags Reagent
     * @summary Undo the soft delete of a reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @returns {Reagent} 200 - The restored reagent
     * @returns {Error} 404 - Reagent not found
     */
    app.patch<{ Params: { id: string } }>(
        "/:id",
        { schema: PATCH_REAGENT_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema },
        async (response, reply) => {
            return await reagentController.undoDeleteReagent(response, reply);
        },
    );
};
