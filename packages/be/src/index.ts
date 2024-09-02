import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify();
server.register(cors, {
    origin: [
        "http://localhost:5173", // fe dev
        "http://localhost:4173", // fe preview
        "http://vm4.quantori.academy:1337", // fe prod
    ],
    methods: ["GET"],
});

server.get("/", async () => {
    return "hello world";
});
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
