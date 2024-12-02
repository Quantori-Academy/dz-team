import { FastifyZodInstance, Roles } from "../types";
import { RequestController } from "../controllers/requestController";
import { RequestCreationBodySchema } from "../../../shared/zodSchemas/request/requestSchemas";
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { GET_REQUESTS_SCHEMA } from "../responseSchemas/requests";
import { checkAuthenticatedAndRole } from "../utils/authCheck";
import { sendErrorResponse } from "../utils/handleErrors";
const requestController = new RequestController();
/**
 * Registers the reagent routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const requestRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / - Retrieves all requests.
     * Authentication required.
     *
     * @returns {Promise<void>} A list of requests.
     */
    app.get(
        "/",
        {
            schema: GET_REQUESTS_SCHEMA satisfies FastifyZodOpenApiSchema,
        },
        async (request, reply) => {
            return await requestController.getAllRequests(request, reply);
        },
    );

    /**
     * POST / - Creates a new request.
     * Requires ADMIN or RESEARCHER role.
     *
     * @body {typeof RequestCreationBodySchema} Body - Request data to create.
     * @returns {Promise<void>} The created request.
     */
    app.post<{ Body: typeof RequestCreationBodySchema }>(
        "/",
        {
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN, Roles.RESEARCHER])],
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
     * GET /user/:userId - Retrieves requests for a specific user.
     * Authentication required.
     *
     * @param {string} userId - The ID of the user whose requests to retrieve.
     * @returns {Promise<void>} A list of requests for the specified user.
     */
    // app.get<{ Params: { userId: string } }>(
    //     "/user/:userId",
    //     {
    //         schema: GET_REQUESTS_SCHEMA satisfies FastifyZodOpenApiSchema, // Make sure the schema reflects fetching by userId
    //     },
    //     async (request, reply) => {
    //         return await requestController.getRequestsByUserId(request, reply);
    //     },
    // );
    app.get<{ Params: { userId: string } }>(
        "/user/:userId",
        {
            preHandler: [checkAuthenticatedAndRole([Roles.RESEARCHER, Roles.ADMIN])],
            schema: GET_REQUESTS_SCHEMA,
        },
        async (request, reply) => {
            try {
                const userId = request.params.userId;

                if (!request.userData || request.userData.userId !== userId) {
                    return reply.status(403).send({ message: "Access denied" });
                }

                const requests = await requestController.getRequestsByUserId(request, reply);
                reply.send(requests);
            } catch (error) {
                console.error("Error:", error);
                sendErrorResponse(reply, error, "Failed to get user's requests");
            }
        },
    );

    // /**
    //  * GET /:requestId - Retrieves a specific request by ID.
    //  * Authentication required.
    //  *
    //  * @param {string} requestId - The ID of the request to retrieve.
    //  * @returns {Promise<void>} The requested data.
    //  */
    // app.get<{ Params: { requestId: string } }>(
    //     "/:requestId",
    //     {
    //         schema: GET_REQUEST_BY_ID_SCHEMA satisfies FastifyZodOpenApiSchema,
    //     },
    //     async (request, reply) => {
    //         return await requestController.getRequestById(request, reply);
    //     },
    // );

    // /**
    //  * PATCH /:requestId - Updates a specific request.
    //  * Requires ADMIN or RESEARCHER role.
    //  *
    //  * @param {string} requestId - The ID of the request to update.
    //  * @body {typeof RequestUpdateBodySchema} Body - The updated data for the request.
    //  * @returns {Promise<void>} The updated request.
    //  */
    // app.patch<{ Params: { requestId: string }; Body: RequestUpdateBody }>(
    //     "/:requestId",
    //     {
    //         preHandler: [checkAuthenticatedAndRole([Roles.ADMIN, Roles.RESEARCHER])],
    //         schema: {
    //             ...(PATCH_REQUEST_SCHEMA satisfies FastifyZodOpenApiSchema),
    //             body: RequestUpdateBodySchema,
    //         },
    //     },
    //     async (request, reply) => {
    //         return await requestController.updateRequest(request, reply);
    //     },
    // );
};
