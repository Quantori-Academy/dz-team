import { Prisma, PrismaClient, RequestStatus, ReagentRequest } from "@prisma/client";
import {
    RequestCreationBody,
    RequestUpdateBody,
    RequestSearch,
    RequestSearchSchema,
    RequestUpdateBodySchema,
} from "../../../shared/zodSchemas/request/requestSchemas";
import { SearchResults } from "../types";
const prisma = new PrismaClient();

export class RequestService {
    public async getAllRequests(
        queryParams: RequestSearch,
    ): Promise<SearchResults<ReagentRequest>> {
        const { query, page, limit, sortBy, sortOrder, status } =
            RequestSearchSchema.parse(queryParams);

        const searchConditions = query
            ? [
                  { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { cas: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { structure: { contains: query, mode: Prisma.QueryMode.insensitive } },
              ]
            : [];

        const where: Prisma.ReagentRequestWhereInput = {
            AND: [
                status ? { status: status as RequestStatus } : {},
                { deletedAt: null },
                searchConditions.length > 0 ? { OR: searchConditions } : {},
            ].filter(Boolean),
        };

        const [requests, totalCount] = await Promise.all([
            prisma.reagentRequest.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
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
        const commentsUser =
            typeof requestData.commentsUser === "string"
                ? [requestData.commentsUser]
                : requestData.commentsUser;
        try {
            const validatedData = {
                ...requestData,
                userId: requestedById,
                status: "pending" as RequestStatus,
                // Use commentsUser directly since it should already be an array
                commentsUser,
            };

            return await prisma.reagentRequest.create({
                data: validatedData,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error creating request:", error.message);
            } else {
                console.error("Error creating request:", error);
            }
            throw new Error("Failed to create request");
        }
    }

    public async deleteRequest(requestId: string) {
        const request = await prisma.reagentRequest.findUnique({ where: { id: requestId } });
        if (!request) throw new Error("Request not found");

        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: { deletedAt: new Date() },
        });
    }

    public async getRequestsByUserId(userId: string, queryParams: RequestSearch) {
        const { query, page, limit, sortBy, sortOrder, status } =
            RequestSearchSchema.parse(queryParams);

        const searchConditions = query
            ? [
                  { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { cas: { contains: query, mode: Prisma.QueryMode.insensitive } },
                  { structure: { contains: query, mode: Prisma.QueryMode.insensitive } },
              ]
            : [];

        const where: Prisma.ReagentRequestWhereInput = {
            AND: [
                { userId },
                status ? { status: status as RequestStatus } : {},
                { deletedAt: null },
                searchConditions.length > 0 ? { OR: searchConditions } : {},
            ].filter(Boolean),
        };

        const [requests, totalCount] = await Promise.all([
            prisma.reagentRequest.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
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

    public async updateRequest(
        requestId: string,
        updateData: Partial<RequestUpdateBody>,
        userData: { userId: string; role: string },
    ) {
        const { commentsUser, commentsProcurement, status, ...restData } =
            RequestUpdateBodySchema.parse(updateData);

        const currentRequest = await prisma.reagentRequest.findUnique({
            where: { id: requestId },
        });

        if (!currentRequest) {
            throw new Error("Request not found");
        }

        if (userData.role === "researcher") {
            if (status || commentsProcurement) {
                throw new Error(
                    "Forbidden: Researchers cannot update status or procurement comments.",
                );
            }

            if (
                currentRequest.status !== "pending" &&
                !(
                    commentsUser &&
                    !restData.name &&
                    !restData.quantity &&
                    !restData.structure &&
                    !restData.cas &&
                    !restData.unit
                )
            ) {
                throw new Error(
                    "Forbidden: When the request is not pending, researchers can only update commentsUser.",
                );
            }
        }

        if (userData.role === "procurementOfficer") {
            if (
                commentsUser ||
                restData.name ||
                restData.quantity ||
                restData.structure ||
                restData.cas ||
                restData.unit
            ) {
                throw new Error(
                    "Forbidden: Procurement officers can only update status and procurement comments.",
                );
            }
        }

        const updatedData: Prisma.ReagentRequestUpdateInput = {
            ...restData,
            updatedAt: new Date(),
        };

        if (status) {
            updatedData.status = status as RequestStatus;
        }

        if (commentsUser) {
            updatedData.commentsUser = { push: commentsUser };
        }

        if (commentsProcurement) {
            updatedData.commentsProcurement = { push: commentsProcurement };
        }

        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: updatedData,
        });
    }
}
