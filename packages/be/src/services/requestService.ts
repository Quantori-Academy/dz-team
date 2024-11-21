import { PrismaClient } from "@prisma/client";
import {
    RequestCreationBodySchema,
    RequestCreationBody,
    CommentRequestBody,
    StatusUpdateBody,
    RequestUpdateBody,
} from "../../../shared/zodSchemas/request/requestSchemas";

const prisma = new PrismaClient();

export class RequestService {
    public async getAllRequests() {
        return prisma.reagentRequest.findMany({
            where: { deletedAt: null },
        });
    }

    public async createRequest(requestedById: string, requestData: RequestCreationBody) {
        if (requestData.orderId && requestData.orderId.trim() === "") {
            throw new Error("orderId cannot be an empty string");
        }

        const validatedData = RequestCreationBodySchema.parse({
            ...requestData,
            userId: requestedById,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return prisma.reagentRequest.create({
            data: validatedData,
        });
    }

    public async getRequestsByUserId(requestedById: string, userId: string) {
        if (requestedById !== userId) {
            throw new Error("Unauthorized");
        }
        return prisma.reagentRequest.findMany({
            where: { userId, deletedAt: null },
        });
    }

    public async updateRequest(requestId: string, updateData: RequestUpdateBody) {
        const validatedData = {
            ...updateData,
            updatedAt: new Date(),
        };

        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: validatedData,
        });
    }

    public async declineRequest(requestId: string, commentData: CommentRequestBody) {
        const request = await prisma.reagentRequest.findUnique({ where: { id: requestId } });
        if (!request) {
            throw new Error("Request not found");
        }

        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: {
                status: "declined",
                commentsUser: {
                    push: commentData.comment,
                },
                updatedAt: new Date(),
            },
        });
    }

    public async updateRequestStatus(requestId: string, statusData: StatusUpdateBody) {
        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: {
                status: statusData.status,
                updatedAt: new Date(),
            },
        });
    }
}
