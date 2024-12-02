import { FastifyRequest, FastifyReply } from "fastify";
import { RequestService } from "../services/requestService";
import { sendErrorResponse } from "../utils/handleErrors";
import {
    RequestCreationBodySchema,
    RequestUpdateBodySchema,
    RequestSearch,
    RequestUpdateBody,
} from "../../../shared/zodSchemas/request/requestSchemas";
import { RequestsListSchema } from "../responseSchemas/requests";

const requestService = new RequestService();

export class RequestController {
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

            const requestData = await requestService.getRequestsByUserId(
                request.userData.userId,
                userId,
            );

            const response = {
                data: requestData,
                meta: {
                    currentPage: 1,
                    totalPages: 1,
                    totalCount: requestData.length,
                    hasNextPage: false,
                    hasPreviousPage: false,
                },
            };

            try {
                RequestsListSchema.parse(response);
                reply.send(response);
            } catch (validationError) {
                if (validationError instanceof Error) {
                    console.error("Validation Error:", validationError.message);
                } else {
                    console.error("Validation Error:", validationError);
                }
                return reply.status(500).send({ message: "Schema validation error" });
            }
        } catch (error) {
            console.error("Error retrieving user requests:", error);
            sendErrorResponse(reply, error, "Failed to get user's requests");
        }
    }

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

    async updateRequest(
        request: FastifyRequest<{ Params: { requestId: string }; Body: RequestUpdateBody }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            if (!request.userData?.userId) {
                return reply.status(401).send({ message: "Unauthorized" });
            }

            // Validate and parse the request body
            const validatedData = RequestUpdateBodySchema.parse(request.body);

            await requestService.updateRequest(
                request.params.requestId,
                validatedData,
                request.userData.userId,
            );
            reply.status(204).send();
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update request");
        }
    }

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
