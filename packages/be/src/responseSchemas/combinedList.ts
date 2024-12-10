import "zod-openapi/extend";
import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import reagentSchema from "shared/generated/zod/modelSchema/ReagentSchema";
import { CombinedListSearchSchema } from "shared/zodSchemas/combinedList/combinedListSearchSchema";

export const ReagentsListSchema = z.object({
    data: z.array(reagentSchema),
    meta: z.object({
        currentPage: z.number().default(1),
        totalPages: z.number().default(4),
        totalCount: z.number().default(2),
        hasNextPage: z.boolean().default(true),
        hasPreviousPage: z.boolean().default(false),
    }),
});

export const GET_COMBINED_LIST_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a list of reagents and samples with metadata for available pages",
    description: "Retrieve a list of available reagents and samples.",
    tags: ["CombinedList"],
    querystring: CombinedListSearchSchema,
    response: {
        200: {
            description: "Reagents list with metadata.",
            content: {
                "application/json": {
                    schema: ReagentsListSchema,
                },
            },
        },
    },
};
