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
        // Handle Zod validation errors
        reply.status(400).send({ message: "Validation error", errors: error.errors });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        // Handle Prisma 'Record not found' error
        reply.status(404).send({ message: "Resource not found" });
    } else if (error instanceof Error) {
        // Handle generic Error instances
        reply.status(500).send({ message: customMessage, error: error.message });
    } else {
        // Handle unknown error types
        reply.status(500).send({ message: "Unexpected server error" });
    }
};
