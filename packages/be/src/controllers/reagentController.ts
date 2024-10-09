import { FastifyRequest, FastifyReply } from "fastify";

import { getAllReagents } from "../services/reagentService";

/**
 * Fetches and returns all reagents.
 *
 * @param {FastifyRequest} _ - The request object from Fastify.
 * @param {FastifyReply} reply - The reply object to send the response.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export const fetchAllReagents = async (_: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const reagents = await getAllReagents();
        reply.send(reagents);
    } catch (error) {
        console.error("Error fetching reagents:", error);
        reply.status(500).send({ error: "Failed to fetch reagents." });
    }
};
