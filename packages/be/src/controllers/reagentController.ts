import { FastifyRequest, FastifyReply } from "fastify";
import * as reagentService from "../services/reagentService";

/**
 * Fetches and returns all reagents.
 *
 * @param {FastifyRequest} req - The request object from Fastify.
 * @param {FastifyReply} reply - The reply object to send the response.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export const getAllReagents = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const reagents = await reagentService.getAllReagents();
        reply.send(reagents);
    } catch (error) {
        console.error("Error fetching reagents:", error);
        reply.status(500).send({ error: "Failed to fetch reagents." });
    }
};
