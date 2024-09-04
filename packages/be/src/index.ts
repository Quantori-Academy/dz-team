import fastify from "fastify";
import cors from "@fastify/cors";
import { isProd } from "./utils/isProd";

const server = fastify();

const corsOptions = isProd
    ? ["http://vm4.quantori.academy:80"]
    : ["http://localhost:5173", "http://localhost:4173"];

server.register(cors, {
    origin: corsOptions,
    methods: ["GET"],
});

server.get("/", async () => {
    return `Hello world! isProd: ${isProd}`;
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
