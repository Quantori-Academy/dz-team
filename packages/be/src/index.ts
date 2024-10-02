import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { isProd } from "./utils/isProd";
import { reagentRoutes } from "./routes/reagentRoutes";
import fastifySwagger from "@fastify/swagger";
import fs from "fs";
import path from "path";

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

// OpenAPI and Swagger init

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

// Generate and save OpenAPI file
server.ready(() => {
    const openapiJson = server.swagger(); // Generate the OpenAPI spec as a JSON object
    // Save the OpenAPI spec as a JSON file
    fs.writeFileSync(
        path.join(__dirname, "openapi", "openapi.json"),
        JSON.stringify(openapiJson, null, 2),
    );
    console.log("OpenAPI spec has been generated and saved to openapi/openapi.json");
});

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
