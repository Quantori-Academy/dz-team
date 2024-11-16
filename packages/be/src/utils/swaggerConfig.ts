import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";
import { fastifyZodOpenApiTransform, fastifyZodOpenApiTransformObject } from "fastify-zod-openapi";
import { ReagentSchema, SampleSchema } from "shared/generated/zod";
import { convertZodToJsonSchema } from "fastify-type-provider-zod/dist/src/zod-to-json";
import { ReagentsListSchema } from "../responseSchemas/reagents";
import { publicUserSchema } from "shared/zodSchemas";
import { SamplesListSchema } from "../responseSchemas/samples";
import { UsersListSchema } from "../responseSchemas/users";

export const registerSwagger = (server: FastifyInstance) => {
    server.register(
        swagger,

        withRefResolver({
            openapi: {
                info: {
                    title: "Fastify API",
                    description: "API documentation for Luna",
                    version: "1.0.0",
                },
                components: {
                    schemas: {
                        Reagent: convertZodToJsonSchema(ReagentSchema),
                        ReagentsList: convertZodToJsonSchema(ReagentsListSchema),
                        User: convertZodToJsonSchema(publicUserSchema),
                        UsersList: convertZodToJsonSchema(UsersListSchema),
                        Sample: convertZodToJsonSchema(SampleSchema),
                        SamplesList: convertZodToJsonSchema(SamplesListSchema),
                    },
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                            description: "Enter JWT token in the format 'Bearer <token>'",
                        },
                    },
                },

                security: [{ BearerAuth: [] }],
            },
            transform: fastifyZodOpenApiTransform,
            transformObject: fastifyZodOpenApiTransformObject,
        }),
    );

    server.register(swaggerUi, {
        routePrefix: "/docs", // Set the route for Swagger UI

        uiConfig: {
            docExpansion: "list",
            deepLinking: false,
        },
    });
};
