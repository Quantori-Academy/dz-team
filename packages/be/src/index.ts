import cors from "@fastify/cors";
import fastify from "fastify";

import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { generateOpenApiSchema } from "./utils/generateOpenApi";
import { isProd } from "./utils/isProd";
import { registerSwagger } from "./utils/swaggerConfig";

import { jwtMiddleware } from "./middlewares/jwtMiddleware";
import { jwtConfig } from "./utils/jwtConfig";

import { apiRoutes } from "./routes/apiRoutes";

const server = fastify().withTypeProvider<ZodTypeProvider>();

const corsOptions = isProd
    ? ["http://vm4.quantori.academy"]
    : ["http://localhost:3000", "http://localhost:4173"];

server.setValidatorCompiler(validatorCompiler);

server.setSerializerCompiler(serializerCompiler);

server.register(cors, {
    origin: corsOptions,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Conditionally import the OpenAPI generator in non-production environments
if (!isProd) {
    // Register Swagger
    registerSwagger(server);

    server.ready(() => {
        generateOpenApiSchema(server); // Call the schema generation without await
    });
}

server.get("/", async () => {
    return `Hello world! isProd: ${isProd}`;
});

// Register the Fastify JWT plugin
server.register(jwtConfig.plugin, jwtConfig.options);

// Register the JWT middleware
jwtMiddleware(server);

// initialization api routes with prefix 'api/v1'
server.register(apiRoutes, { prefix: "/api/v1" });

server.listen(
    {
        port: 1337,
        host: "0.0.0.0",
    },
    (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("Server is listening on " + address);
    },
);
