import { FastifyReply } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";

/**
 * Sends an error response to the client based on the type of error encountered.
 *
 * @param reply - The Fastify reply object used to send responses.
 * @param error - The error object that was thrown.
 * @param customMessage - A custom message to include in the response for better context.
 */

export const sendErrorResponse = (
    reply: FastifyReply,
    error: unknown,
    customMessage: string,
): void => {
    if (error instanceof z.ZodError) {
        reply.status(400).send({ message: "Validation error", errors: error.errors });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        reply.status(404).send({ message: "Resource not found" });
    } else if (error instanceof Error) {
        reply.status(500).send({ message: customMessage });
    } else {
        reply.status(500).send({ message: "Unexpected server error" });
    }
};
