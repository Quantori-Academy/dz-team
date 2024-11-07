import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { CombinedListService } from "../services/combinedListService";
import { CombinedListSearchSchema } from "../../../shared/zodSchemas";

const combinedListService = new CombinedListService();

export class CombinedListController {
    /**
     * Get all reagents and samples.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of Reagents and Samples.
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
