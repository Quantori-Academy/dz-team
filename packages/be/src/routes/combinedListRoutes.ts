// Internal controllers
import { combinedListController } from "../controllers/combinedListController";

// Internal types
import { FastifyZodInstance } from "../types";

// Shared schemas
import { CombinedListSearch } from "../../../shared/zodSchemas/combinedList/combinedListSearchSchema";

/**
 * Registers the combined list route with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered
 */
export const combinedListRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / endpoint to retrieve a list of reagents and samples.
     *
     * @name GetCombinedList
     * @function
     * @memberof module:routes
     * @param {import("shared/zodSchemas").CombinedListSearch} request.query - The search parameters for filtering reagents and samples.
     * @param {Object} reply - The reply object.
     * @returns {Promise<Object>} The list of reagents and samples and metadata.
     * @throws {Error} Throws an error if there is an issue retrieving reagents and samples.
     *
     * @typedef {Object} CombinedListSearch
     * @property {number} [page] - The page number for pagination.
     * @property {number} [limit] - The number of results per page.
     * @property {string} [sortBy] - The field to sort the results by.
     * @property {'asc' | 'desc'} [sortOrder] - The order to sort the results.
     * @property {string} [category] - The category of item to filter by.
     * @property {string} [status] - The status of reagents to filter by.
     * @property {string} [storageLocation] - The storage location to filter by.
     * @property {string} [query] - A search query to filter results.
     *
     * @example
     * // Example query
     * GET /?page=1&limit=20&sortBy=name&sortBy=structure&sortOrder=asc
     */
    app.get<{ Querystring: CombinedListSearch }>(
        "/",
        { schema: { tags: ["CombinedList"] } },
        async (request, reply) => {
            return await combinedListController.getCombinedList(request, reply);
        },
    );
};
