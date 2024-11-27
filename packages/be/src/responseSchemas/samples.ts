import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import sampleSchema from "shared/generated/zod/modelSchema/SampleSchema";

export const SamplesListSchema = z.array(sampleSchema);

export const GET_SAMPLES_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves a list of samples",
    description: "Retrieve a list of available samples.",
    tags: ["Samples"],
    response: {
        200: {
            description: "Samples list.",
            content: {
                "application/json": {
                    schema: SamplesListSchema,
                },
            },
        },
    },
};
