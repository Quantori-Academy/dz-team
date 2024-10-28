import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ReagentService } from "../services/reagentService";
import {
    ReagentCreateInputSchema,
    ReagentUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { idSchema, ReagentSearchSchema } from "../../../shared/zodSchemas";

const reagentService = new ReagentService();

export class ReagentController {
    /**
     * Get all reagents.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of Reagent.
     */
    async getReagents(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const validatedData = ReagentSearchSchema.parse(request.query);
            const reagents = await reagentService.getAllReagents(validatedData);
            reply.send(reagents);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }

    /**
     * Get a specific reagent by ID.
     * @param request - FastifyRequest containing the reagent ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the Reagent object or a 404 response if not found.
     */
    async getReagent(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);

            const reagent = await reagentService.getReagent(validatedId);
            if (!reagent) {
                return reply.status(404).send({ message: "Reagent not found" });
            }
            reply.send(reagent);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }

    /**
     * Create a new reagent.
     * @param request - FastifyRequest containing the reagent data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the created Reagent object.
     */
    async createReagent(
        request: FastifyRequest<{ Body: unknown }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedData = ReagentCreateInputSchema.parse(request.body);

            const reagent = await reagentService.createReagent(validatedData);
            reply.send(reagent);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }

    /**
     * Update an existing reagent.
     * @param request - FastifyRequest containing the reagent ID in the parameters and update data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the updated Reagent object.
     */
    async updateReagent(
        request: FastifyRequest<{ Params: { id: string }; Body: unknown }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const validatedData = ReagentUpdateInputSchema.parse(request.body);

            const reagent = await reagentService.updateReagent(validatedId, validatedData);
            reply.send(reagent);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }

    /**
     * Soft delete a reagent by ID.
     * @param request - FastifyRequest containing the reagent ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the updated Reagent object or a 404 response if not found.
     */
    async deleteReagent(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);

            const reagent = await reagentService.deleteReagent(validatedId);
            if (!reagent) {
                return reply.status(404).send({ message: "Reagent not found" });
            }
            reply.send(reagent);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: "Validation error", errors: error.errors });
            }
            return reply.status(500).send({ message: "Internal server error" });
        }
    }

    /**
     * Undo the soft delete of a reagent by ID.
     * @param request - FastifyRequest containing the reagent ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the restored Reagent object or a 404 response if not found.
     */
    async undoDeleteReagent(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);

            const reagent = await reagentService.undoDeleteReagent(validatedId);
            if (!reagent) {
                return reply.status(404).send({ message: "Reagent not found" });
            }
            reply.send(reagent);
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
