import { FastifyRequest, FastifyReply } from "fastify";

import { idSchema } from "../../../shared/zodSchemas/baseSchemas";
import { SampleSearchSchema } from "../../../shared/zodSchemas/samples/sampleSearchSchema";

import { sampleService } from "../services/sampleService";

import { sendErrorResponse } from "../utils/handleErrors";
import {
    SampleCreateSchema,
    SampleUpdateSchema,
} from "../../../shared/zodSchemas/samples/extendedSampleSchemas";

class SampleController {
    /**
     * Get all samples.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of Sample.
     */
    async getSamples(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const validatedData = SampleSearchSchema.parse(request.query);
            const samples = await sampleService.getSamples(validatedData);
            reply.send(samples);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to retrieve samples");
        }
    }

    /**
     * Get a specific sample by ID.
     * @param request - FastifyRequest containing the sample ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the Sample object or a 404 response if not found.
     */
    async getSample(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);

            const sample = await sampleService.getSample(validatedId);
            if (!sample) {
                return reply.status(404).send({ message: "Sample not found" });
            }
            reply.send(sample);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to retrieve sample");
        }
    }

    /**
     * Create a new sample.
     * @param request - FastifyRequest containing the sample data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the created Sample object.
     */
    async createSample(
        request: FastifyRequest<{ Body: typeof SampleCreateSchema }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedData = SampleCreateSchema.parse(request.body);

            const sample = await sampleService.createSample(validatedData);
            reply.send(sample);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to create sample");
        }
    }

    /**
     * Update an existing sample.
     * @param request - FastifyRequest containing the sample ID in the parameters and update data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the updated Sample object.
     */
    async updateSample(
        request: FastifyRequest<{ Params: { id: string }; Body: unknown }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const validatedData = SampleUpdateSchema.parse(request.body);

            const sample = await sampleService.updateSample(validatedData, validatedId);
            reply.send(sample);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update sample");
        }
    }

    /**
     * Soft delete a sample by ID.
     * @param request - FastifyRequest containing the sample ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the updated Sample object or a 404 response if not found.
     */
    async deleteSample(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);

            const sample = await sampleService.deleteSample(validatedId);
            if (!sample) {
                return reply.status(404).send({ message: "Sample not found" });
            }
            reply.send(sample);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to delete sample");
        }
    }

    /**
     * Undo the soft delete of a sample by ID.
     * @param request - FastifyRequest containing the sample ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the restored Sample object or a 404 response if not found.
     */
    async undoDeleteSample(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);

            const sample = await sampleService.undoDeleteSample(validatedId);
            if (!sample) {
                return reply.status(404).send({ message: "Sample not found" });
            }
            reply.send(sample);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to undo sample delete");
        }
    }
}

export const sampleController = new SampleController();
