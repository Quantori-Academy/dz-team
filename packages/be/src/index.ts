import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { isProd } from "./utils/isProd";

const prisma = new PrismaClient();
const server = fastify();

const corsOptions = isProd
    ? ["http://vm4.quantori.academy"]
    : ["http://localhost:5173", "http://localhost:4173"];

server.register(cors, {
    origin: corsOptions,
    methods: ["GET", "POST"],
});

server.get("/", async () => {
    return `Hello world! isProd: ${isProd}`;
});

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
            data: {
                smiles,
            },
        });
        return molecule;
    },
);

server.get("/molecule/count", async () => {
    const count = await prisma.molecule.count();
    return count;
});

server.listen(
    {
        port: 1337,
        host: "0.0.0.0",
        // TODO: check host for security
    },
    (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("Server is listening on port " + address);
    },
);
