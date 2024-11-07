import fastifyJwt from "@fastify/jwt";

export const jwtConfig = {
    plugin: fastifyJwt,
    options: {
        secret: process.env.JWT_SECRET || "b82359e8-f0a5-41d4-8677-2180f836d8cd",
        sign: { expiresIn: "1h" }, // Set expiration to 10 minutes for testing
    },
};
