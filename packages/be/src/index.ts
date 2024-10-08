import fastify from "fastify";
import cors from "@fastify/cors";

import { PrismaClient } from "@prisma/client";

import { isProd } from "./utils/isProd";
import { registerSwagger } from "./config/swaggerConfig";
import { generateOpenApiSchema } from "./utils/generateOpenApi";
import { reagentRoutes } from "./routes/reagentRoutes";

// Initialize Prisma Client
const prisma = new PrismaClient();
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

// Register Swagger
registerSwagger(server);

// Register reagent routes with prefix 'api/v1'
server.register(reagentRoutes, { prefix: "/api/v1" });

// POST route for creating a molecule
server.post(
    "/molecule",
    {
        schema: {
            body: {
                type: "object",
                properties: {
                    smiles: { type: "string" },
                },
                additionalProperties: false,
                required: ["smiles"],
            },
        },
    },
    async (request) => {
        const { smiles } = request.body as { smiles: string };
        const molecule = await prisma.molecule.create({
            data: { smiles },
        });
        return molecule;
    },
);

// GET route for counting molecules
server.get("/molecule/count", async () => {
    const count = await prisma.molecule.count();
    return count;
});

// Conditionally import the OpenAPI generator in non-production environments
if (!isProd) {
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
