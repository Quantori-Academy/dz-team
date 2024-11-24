import fastifySwagger from "@fastify/swagger";
import { FastifyZodInstance } from "../types";

export const registerSwagger = (server: FastifyZodInstance) => {
    server.register(fastifySwagger, {
        routePrefix: "/api/docs",
        swagger: {
            info: {
                title: "Luna API Documentation",
                description: "Fastify Swagger API",
                version: "1.0.0",
            },
            host: "localhost:1337",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
        },
        exposeRoute: true,
    });
};
