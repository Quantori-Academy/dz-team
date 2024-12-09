// External dependencies
import { FastifyRequest, FastifyReply } from "fastify";

// Internal services and utilities
import { requestService } from "../services/requestService";
import { sendErrorResponse } from "../utils/handleErrors";

// Shared schemas
import {
    RequestCreationBodySchema,
    RequestUpdateBodySchema,
    RequestSearch,
    RequestUpdateBody,
} from "../../../shared/zodSchemas/request/requestSchemas";

class RequestController {
    /**
     * Fetches all reagent requests based on query parameters.
     *
     * @param {FastifyRequest} request - The Fastify request object.
     * @param {FastifyReply} reply - The Fastify reply object.
     * @returns {Promise<void>}
     */
    async getAllRequests(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const queryString: RequestSearch = request.query as RequestSearch;
            const requests = await requestService.getAllRequests(queryString);

            reply.send(requests);
        } catch (error) {
            console.error("Error: ", error);
            sendErrorResponse(reply, error, "Failed to get requests");
        }
    }

    /**
     * Fetches reagent requests for a specific user based on query parameters.
     *
     * @param {FastifyRequest<{ Params: { userId: string } }>} request - The Fastify request object containing user ID in params.
     * @param {FastifyReply} reply - The Fastify reply object.
     * @returns {Promise<void>}
     */
    async getRequestsByUserId(
        request: FastifyRequest<{ Params: { userId: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const userId = request.params.userId;
            if (!request.userData?.userId) {
                return reply.status(401).send({ message: "Unauthorized" });
            }
            if (request.userData.userId !== userId) {
                return reply.status(403).send({ message: "Access denied" });
            }

            const queryString: RequestSearch = request.query as RequestSearch;

            const response = await requestService.getRequestsByUserId(userId, queryString);

            reply.send(response);
        } catch (error) {
            console.error("Error retrieving user requests:", error);
            sendErrorResponse(reply, error, "Failed to get user's requests");
        }
    }

    /**
     * Creates a new reagent request.
     *
     * @param {FastifyRequest<{ Body: typeof RequestCreationBodySchema }>} request - The Fastify request object containing request body.
     * @param {FastifyReply} reply - The Fastify reply object.
     * @returns {Promise<void>}
     */
    async createRequest(
        request: FastifyRequest<{ Body: typeof RequestCreationBodySchema }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            if (!request.userData || !request.userData.userId) {
                return reply.status(401).send({ message: "Unauthorized" });
            }

            const validatedData = RequestCreationBodySchema.parse(request.body);

            const createdRequest = await requestService.createRequest(
                request.userData.userId,
                validatedData,
            );

            reply.status(201).send(createdRequest);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error: ", error.message); // Detailed logging
            } else {
                console.error("Error: ", error); // Fallback for non-Error types
            }
            sendErrorResponse(reply, error, "Failed to create request");
        }
    }

    /**
     * Updates a reagent request.
     *
     * @param {FastifyRequest<{ Params: { requestId: string }; Body: RequestUpdateBody }>} request - The Fastify request object containing request ID and update body.
     * @param {FastifyReply} reply - The Fastify reply object.
     * @returns {Promise<void>}
     */
    async updateRequest(
        request: FastifyRequest<{ Params: { requestId: string }; Body: RequestUpdateBody }>,
        reply: FastifyReply,
    ): Promise<void> {
        if (!request.userData?.userId) {
            return reply.status(401).send({ message: "Unauthorized" });
        }

        // Validate and parse the request body
        const validatedData = RequestUpdateBodySchema.parse(request.body);

        await requestService.updateRequest(
            request.params.requestId,
            validatedData,
            request.userData,
            // request.userData.userId,
        );
        reply.status(204).send();
    }

    /**
     * Fetches a single reagent request by its ID.
     *
     * @param {FastifyRequest<{ Params: { requestId: string } }>} request - The Fastify request object containing request ID in params.
     * @param {FastifyReply} reply - The Fastify reply object.
     * @returns {Promise<void>}
     */
    async getRequestById(
        request: FastifyRequest<{ Params: { requestId: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const requestId = request.params.requestId;
            const result = await requestService.getSingleRequest(requestId);
            if (!result) {
                return reply.status(404).send({ message: "Request not found" });
            }
            reply.send(result);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get request by ID");
        }
    }
}

export const requestController = new RequestController();
