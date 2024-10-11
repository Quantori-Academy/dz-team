import fastify from "fastify";
import cors from "@fastify/cors";

import { isProd } from "./utils/isProd";
import { registerSwagger } from "./config/swaggerConfig";
import { generateOpenApiSchema } from "./utils/generateOpenApi";
import { apiRoutes } from "./routes/apiRoutes";

// Initialize Prisma Client
const server = fastify();

// Set up CORS options based on production or development environment
const corsOptions = isProd
    ? ["http://vm4.quantori.academy"]
    : ["http://localhost:3000", "http://localhost:4173"];

server.register(cors, {
    origin: corsOptions,
    methods: ["GET", "POST"],
});

// Root route
server.get("/", async () => {
    return `Hello world! isProd: ${isProd}`;
});

// initialization api routes with prefix 'api/v1'
server.register(apiRoutes, { prefix: "/api/v1" });

// Conditionally import the OpenAPI generator in non-production environments
if (!isProd) {
    // Register Swagger
    registerSwagger(server);

    server.ready(() => {
        generateOpenApiSchema(server); // Call the schema generation without await
    });
}

// Start the server
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
