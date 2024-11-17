import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";
import { fastifyZodOpenApiTransform, fastifyZodOpenApiTransformObject } from "fastify-zod-openapi";
import { ReagentSchema, SampleSchema } from "shared/generated/zod";
import { convertZodToJsonSchema } from "fastify-type-provider-zod/dist/src/zod-to-json";
import { ReagentCreationSchema, ReagentsListSchema } from "../responseSchemas/reagents";
import { publicUserSchema, registerUserSchema } from "shared/zodSchemas";
import { SamplesListSchema } from "../responseSchemas/samples";
import { UsersListSchema } from "../responseSchemas/users";
import { storageLocationsListSchema } from "../responseSchemas/storageLocations";
import storageLocationSchema from "shared/generated/zod/modelSchema/StorageLocationSchema";

export const registerSwagger = (server: FastifyInstance) => {
    server.register(
        swagger,

        withRefResolver({
            openapi: {
                info: {
                    title: "Fastify API",
                    description: "API documentation for Luna",
                    version: "3.0.0",
                },
                components: {
                    schemas: {
                        Reagent: convertZodToJsonSchema(ReagentSchema),
                        ReagentsList: convertZodToJsonSchema(ReagentsListSchema),
                        ReagentCreation: convertZodToJsonSchema(ReagentCreationSchema),
                        User: convertZodToJsonSchema(publicUserSchema),
                        UsersList: convertZodToJsonSchema(UsersListSchema),
                        UserRegistration: convertZodToJsonSchema(registerUserSchema),
                        Sample: convertZodToJsonSchema(SampleSchema),
                        SamplesList: convertZodToJsonSchema(SamplesListSchema),
                        StorageLocationsList: convertZodToJsonSchema(storageLocationsListSchema),
                        StorageLocation: convertZodToJsonSchema(storageLocationSchema),
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
