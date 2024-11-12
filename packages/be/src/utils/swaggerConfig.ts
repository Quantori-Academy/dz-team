import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export const registerSwagger = (server: FastifyInstance) => {
    server.register(swagger, {
        swagger: {
            info: {
                title: "Fastify API",
                description: "API documentation for Luna",
                version: "1.0.0",
            },
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
        },
    });

    server.register(swaggerUi, {
        routePrefix: "/docs", // Set the route for Swagger UI
        uiConfig: {
            docExpansion: "full",
            deepLinking: false,
        },
    });
};
