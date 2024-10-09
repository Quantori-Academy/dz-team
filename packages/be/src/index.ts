import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { isProd } from "./utils/isProd";
import { registerSwagger } from "./config/swaggerConfig";
import { generateOpenApiSchema } from "./utils/generateOpenApi";
import { reagentRoutes } from "./routes/reagentRoutes";
import { userSchema, moleculeSchema } from "shared/zod-schemas";

const prisma = new PrismaClient();
const server = fastify().withTypeProvider<ZodTypeProvider>();

const corsOptions = isProd
    ? ["http://vm4.quantori.academy"]
    : ["http://localhost:3000", "http://localhost:4173"];

server.register(cors, {
    origin: corsOptions,
    methods: ["GET", "POST"],
});

server.get("/", async () => {
    return `Hello world! isProd: ${isProd}`;
});

// FOR TESTING PURPOSES ONLY
server.post("/login", async (request, reply) => {
    try {
        const user = userSchema.parse(request.body);
        console.log("user validated:", user);
        return { success: true, data: user };
    } catch (error) {
        reply.status(400).send(error);
    }
});

// api routes with prefix 'api/v1'
server.register(reagentRoutes, { prefix: "/api/v1" });

server.post("/molecule", async (request) => {
    // the body is now typed according to the zod schema
    try {
        const { smiles } = moleculeSchema.parse(request.body);
        const molecule = await prisma.molecule.create({ data: { smiles } });
        return molecule;
    } catch (err) {
        console.log("failed to add a molecule:", err);
    }
});

server.get("/molecule/count", async () => {
    try {
        const count = await prisma.molecule.count();
        return count;
    } catch (err) {
        console.log("failed to update molecule count:", err);
    }
});

// Conditionally import the OpenAPI generator in non-production environments
if (!isProd) {
    // Register Swagger
    registerSwagger(server);

    server.ready(() => {
        generateOpenApiSchema(server); // Call the schema generation without await
    });
}

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
    }
);
