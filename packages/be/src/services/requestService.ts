import { Prisma, PrismaClient, RequestStatus } from "@prisma/client";
import {
    RequestCreationBodySchema,
    RequestCreationBody,
    RequestUpdateBody,
    RequestSearch,
    RequestSearchResults,
    RequestSearchSchema,
} from "../../../shared/zodSchemas/request/requestSchemas";

const prisma = new PrismaClient();

export class RequestService {
    public async getAllRequests(queryParams: RequestSearch): Promise<RequestSearchResults> {
        // Validate query parameters using the RequestSearchSchema
        const { query, page, limit, sortBy, status } = RequestSearchSchema.parse(queryParams);

        const searchConditions = query
            ? [
                  { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { cas: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { structure: { contains: query, mode: Prisma.QueryMode.insensitive } },
              ]
            : [];

        const where: Prisma.ReagentRequestWhereInput = {
            AND: [
                status ? { status: { equals: status as RequestStatus } } : {},
                { deletedAt: null },
                searchConditions.length > 0 ? { OR: searchConditions } : {},
            ].filter(Boolean),
        };

        const [requests, totalCount] = await Promise.all([
            prisma.reagentRequest.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: "asc" },
            }),
            prisma.reagentRequest.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            data: requests,
            meta: {
                currentPage: page,
                totalPages,
                totalCount,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    public async getSingleRequest(requestId: string) {
        const request = await prisma.reagentRequest.findUnique({ where: { id: requestId } });
        if (!request) throw new Error("Request not found");
        return request;
    }

    public async createRequest(requestedById: string, requestData: RequestCreationBody) {
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

    public async deleteRequest(requestId: string) {
        const request = await prisma.reagentRequest.findUnique({ where: { id: requestId } });
        if (!request) throw new Error("Request not found");

        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: { deletedAt: new Date() },
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
        const { status, commentsUser, commentsProcurement } = updateData;

        const validatedData: Prisma.ReagentRequestUpdateInput = {
            ...updateData,
            updatedAt: new Date(),
            commentsUser: commentsUser ? { push: commentsUser.split(",") } : undefined,
            commentsProcurement:
                status === "declined"
                    ? commentsProcurement
                        ? { push: commentsProcurement.split(",") }
                        : (() => {
                              throw new Error(
                                  "Procurement comment is required when declining a request",
                              );
                          })()
                    : undefined,
        };

        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: validatedData,
        });
    }
}
