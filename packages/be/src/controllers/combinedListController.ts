// Zod validation library
import { z } from "zod";

// Fastify types
import { FastifyRequest, FastifyReply } from "fastify";

// Internal service
import { combinedListService } from "../services/combinedListService";

// Shared schemas
import { CombinedListSearchSchema } from "../../../shared/zodSchemas/combinedList/combinedListSearchSchema";

class CombinedListController {
    /**
     * Get all reagents and samples.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of Reagents and Samples
     */
    async getCombinedList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const validatedData = CombinedListSearchSchema.parse(request.query);
            const items = await combinedListService.getAllItems(validatedData);
            reply.send(items);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }
}

export const combinedListController = new CombinedListController();
