import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export const registerSwagger = (server: FastifyInstance) => {
    server.register(swagger, {
        openapi: {
            info: {
                title: "Fastify API",
                description: "API documentation for Luna",
                version: "1.0.0",
            },
            components: {
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
    });

    server.register(swaggerUi, {
        routePrefix: "/docs", // Set the route for Swagger UI
        uiConfig: {
            docExpansion: "list",
            deepLinking: false,
        },
    });
};
