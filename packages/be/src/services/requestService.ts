import { Prisma, PrismaClient, RequestStatus, ReagentRequest } from "@prisma/client"; // Ensure RequestStatus is imported
import {
    RequestCreationBody,
    RequestUpdateBody,
    RequestSearch,
    RequestSearchSchema,
    RequestUpdateBodySchema,
} from "../../../shared/zodSchemas/request/requestSchemas";
const prisma = new PrismaClient();

type RequestSearchResults = {
    data: ReagentRequest[]; // Use ReagentRequest array
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

export class RequestService {
    public async getAllRequests(queryParams: RequestSearch): Promise<RequestSearchResults> {
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
                status ? { status: status as RequestStatus } : {}, // Correct usage of status
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
        const validatedData = {
            ...requestData,
            userId: requestedById,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: requestData.status as RequestStatus, // Ensure this maps to Prisma's enum type
        };

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

    public async updateRequest(
        requestId: string,
        updateData: Partial<RequestUpdateBody>,
        userId: string,
    ) {
        // Validate data
        const validatedData = RequestUpdateBodySchema.parse(updateData);

        // Handle comment creation
        if (validatedData.comment) {
            await prisma.reagentRequestComment.create({
                data: {
                    comment: validatedData.comment,
                    reagentRequestId: requestId,
                    userId: userId,
                },
            });
        }

        const { comment, status, ...restData } = validatedData;

        return prisma.reagentRequest.update({
            where: { id: requestId },
            data: {
                ...restData,
                ...(status && { status: { set: status as RequestStatus } }), // Use set operation for status
                updatedAt: new Date(),
            },
        });
    }
}
