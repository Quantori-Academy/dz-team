import { FastifyRequest, FastifyReply } from "fastify";

import { getAllSamples } from "../services/sampleService";

/**
 * Fetches and returns all samples.
 *
 * @param {FastifyRequest} _ - The request object from Fastify.
 * @param {FastifyReply} reply - The reply object to send the response.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export const fetchAllSamples = async (_: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const samples = await getAllSamples();
        reply.send(samples);
    } catch (error) {
        console.error("Error fetching samples:", error);
        reply.status(500).send({ error: "Failed to fetch samples." });
    }
};
