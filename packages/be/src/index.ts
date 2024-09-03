import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify();
server.register(cors, {
    origin: [
        "http://localhost:5173", // fe dev
        "http://localhost:4173", // fe preview
        "http://localhost:8080", // docker dev
        "http://vm4.quantori.academy:1337", // fe prod
    ],
    methods: ["GET"],
});

server.get("/", async () => {
    return "hello world";
});
server.listen(
    {
        port: 8080,
        host: "0.0.0.0",
    },
    (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("Server is listening on port " + address);
    },
);
