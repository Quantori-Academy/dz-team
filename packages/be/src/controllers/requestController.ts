import { FastifyRequest, FastifyReply } from "fastify";
import { RequestService } from "../services/requestService";
import { sendErrorResponse } from "../utils/handleErrors";
import {
    RequestCreationBodySchema,
    RequestUpdateBodySchema,
    RequestSearch,
} from "../../../shared/zodSchemas/request/requestSchemas";

const requestService = new RequestService();

export class RequestController {
    /**
     * Get all requests.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of requests.
     */
    async getAllRequests(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const queryString: RequestSearch = request.query as RequestSearch;
            const requests = await requestService.getAllRequests(queryString);
            reply.send(requests);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get requests");
        }
    }
    /**
     * Get requests by user ID.
     * @param request - FastifyRequest containing the user ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the user's requests or a 401 response if unauthorized.
     */
    async getRequestsByUserId(
        request: FastifyRequest<{ Params: { userId: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const userId = request.params.userId;
            if (!request.userData || !request.userData.userId) {
                return reply.status(401).send({ message: "Unauthorized" });
            }
            const requests = await requestService.getRequestsByUserId(
                request.userData.userId,
                userId,
            );
            reply.send(requests);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get user's requests");
        }
    }

    /**
     * Create a new request.
     * @param request - FastifyRequest containing the request data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the created request or a 401 response if unauthorized.
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
            sendErrorResponse(reply, error, "Failed to create request");
        }
    }

    /**
     * Update a specific request.
     * @param request - FastifyRequest containing the request ID in the parameters and update data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves when request is updated or a 401 response if unauthorized.
     */
    async updateRequest(
        request: FastifyRequest<{
            Params: { requestId: string };
            Body: typeof RequestUpdateBodySchema;
        }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            if (!request.userData || !request.userData.userId) {
                return reply.status(401).send({ message: "Unauthorized" });
            }
            const requestId = request.params.requestId;
            const validatedData = RequestUpdateBodySchema.parse(request.body);
            await requestService.updateRequest(requestId, validatedData);
            reply.status(204).send();
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update request");
        }
    }
}
