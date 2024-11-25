import { FastifyZodInstance } from "../types";
import { RequestController } from "../controllers/requestController";
import {
    RequestCreationBodySchema,
    RequestUpdateBodySchema,
} from "../../../shared/zodSchemas/request/requestSchemas";

const requestController = new RequestController();

/**
 * Registers the request routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const requestRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / - Retrieves all requests.
     *
     * @returns {Promise<void>} A list of requests.
     */
    app.get(
        "/",
        {
            schema: {
                tags: ["Request"],
            },
        },
        async (request, reply) => {
            return await requestController.getAllRequests(request, reply);
        },
    );

    /**
     * POST / - Creates a new request.
     *
     * @body {typeof RequestCreationBodySchema} Body - Request data to create.
     * @returns {Promise<void>} The created request.
     */
    app.post<{ Body: typeof RequestCreationBodySchema }>(
        "/",
        {
            schema: {
                tags: ["Request"],
                body: RequestCreationBodySchema,
            },
        },
        async (request, reply) => {
            return await requestController.createRequest(request, reply);
        },
    );

    /**
     * GET /:userId - Retrieves requests for a specific user.
     *
     * @param {string} userId - The ID of the user whose requests to retrieve.
     * @returns {Promise<void>} A list of requests for the specified user.
     */
    app.get<{ Params: { userId: string } }>(
        "/:userId",
        {
            schema: {
                tags: ["Request"],
            },
        },
        async (request, reply) => {
            return await requestController.getRequestsByUserId(request, reply);
        },
    );

    /**
     * PATCH /:requestId - Updates a specific request.
     *
     * @param {string} requestId - The ID of the request to update.
     * @body {typeof RequestUpdateBodySchema} Body - The updated data for the request.
     * @returns {Promise<void>} The updated request.
     */
    app.patch<{ Params: { requestId: string }; Body: typeof RequestUpdateBodySchema }>(
        "/:requestId",
        {
            schema: {
                tags: ["Request"],
                body: RequestUpdateBodySchema,
            },
        },
        async (request, reply) => {
            return await requestController.updateRequest(request, reply);
        },
    );
};
