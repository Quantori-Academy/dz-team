import { FastifyRequest, FastifyReply } from "fastify";
import {
    StorageLocationCreateInputSchema,
    StorageLocationUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";

import { StorageLocationService } from "../services/storageLocationService";
import { sendErrorResponse } from "../utils/handleErrors";
import { StorageLocationSearchSchema } from "shared/zodSchemas/storageLocation/storageLocationSearchSchema";
import { idSchema } from "shared/zodSchemas/baseSchemas";

const storageLocationService = new StorageLocationService();

export class StorageLocationController {
    /**
     * Get all storage locations.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of StorageLocation.
     */
    async getStorageLocations(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const validatedData = StorageLocationSearchSchema.parse(request.query);
            const storageLocations =
                await storageLocationService.getAllStorageLocations(validatedData);
            reply.send(storageLocations);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get storage locations");
        }
    }

    /**
     * Get a specific storage location by ID.
     * @param request - FastifyRequest containing the storage location ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the StorageLocation object or a 404 response if not found.
     */
    async getStorageLocation(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const storageLocation = await storageLocationService.getStorageLocation(validatedId);
            if (!storageLocation) {
                return reply.status(404).send({ message: "Storage location not found" });
            }
            reply.send(storageLocation);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get storage location");
        }
    }

    /**
     * Create a new storage location.
     * @param request - FastifyRequest containing the storage location data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the created StorageLocation object.
     */
    async createStorageLocation(
        request: FastifyRequest<{ Body: unknown }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedData = StorageLocationCreateInputSchema.parse(request.body);
            const storageLocation =
                await storageLocationService.createStorageLocation(validatedData);
            reply.send(storageLocation);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to create storage location");
        }
    }

    /**
     * Update an existing storage location.
     * @param request - FastifyRequest containing the storage location ID in the parameters and update data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the updated StorageLocation object.
     */
    async updateStorageLocation(
        request: FastifyRequest<{ Params: { id: string }; Body: unknown }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const validatedData = StorageLocationUpdateInputSchema.parse(request.body);
            const storageLocation = await storageLocationService.updateStorageLocation(
                validatedId,
                validatedData,
            );
            reply.send(storageLocation);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update storage location");
        }
    }

    /**
     * Delete a storage location by ID.
     * @param request - FastifyRequest containing the storage location ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the deleted StorageLocation object or a 404 response if not found.
     */
    async deleteStorageLocation(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const storageLocation = await storageLocationService.deleteStorageLocation(validatedId);
            if (!storageLocation) {
                return reply.status(404).send({ message: "Storage location not found" });
            }
            reply.send(storageLocation);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to delete storage location");
        }
    }

    /**
     * Undo the deletion of a storage location by ID.
     * @param request - FastifyRequest containing the storage location ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to the restored StorageLocation object or a 404 response if not found.
     */
    async undoDeleteStorageLocation(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const validatedId = idSchema.parse(request.params.id);
            const restoredLocation =
                await storageLocationService.undoDeleteStorageLocation(validatedId);
            if (!restoredLocation) {
                return reply.status(404).send({ message: "Storage location not found" });
            }
            reply.send(restoredLocation);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to restore storage location");
        }
    }

    /**
     * Handles the request to move a reagent to a new storage location.
     *
     * @param {FastifyRequest<{ Params: { reagentId: string }; Body: { newStorageLocationId: string } }>} request - The incoming request object containing the reagent ID and new storage location ID.
     * @param {FastifyReply} reply - The reply object used to send a response back to the client.
     * @returns {Promise<void>} - Sends the updated reagent or an error response.
     * @throws {Error} - Returns a 500 status with an internal server error message if an error occurs.
     */
    async moveReagent(
        request: FastifyRequest<{
            Params: { reagentId: string };
            Body: { newStorageLocationId: string };
        }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const { reagentId } = request.params;
            const { newStorageLocationId } = request.body;
            const movedReagent = await storageLocationService.moveReagent(
                reagentId,
                newStorageLocationId,
            );
            reply.send(movedReagent);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to move reagent");
        }
    }
}
