import { FastifyRequest, FastifyReply } from "fastify";
import {
    SellerCreateInputSchema,
    SellerUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { idSchema } from "../../../shared/zodSchemas/baseSchemas";
import { SellerSearchSchema } from "../../../shared/zodSchemas/seller/sellerSearchSchema";

import { SellerService } from "../services/sellerService";
import { sendErrorResponse } from "../utils/handleErrors";

const sellerService = new SellerService();

export class SellerController {
    /**
     * Get all sellers.
     * @param request - FastifyRequest
     * @param reply - FastifyReply
     * @returns A promise that resolves to an array of Sellers.
     */
    async getAllSellers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const validatedData = SellerSearchSchema.parse(request.query);
            const sellers = await sellerService.getAllSellers(validatedData);
            reply.send(sellers);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to get sellers");
        }
    }

    /**
     * Create a new seller or return an existing seller's ID if the name is not unique.
     * @param request - FastifyRequest containing the seller data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the seller ID.
     */
    async createSeller(
        request: FastifyRequest<{ Body: { name: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            const { name } = SellerCreateInputSchema.parse(request.body);
            const existingSeller = await sellerService.findSellerByName(name);

            if (existingSeller) {
                return reply.send(existingSeller);
            }

            const newSeller = await sellerService.createSeller({ name });
            reply.send(newSeller);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to create or get seller");
        }
    }

    /**
     * Update a seller's name. If the new name matches an existing seller, return that seller's ID.
     * @param request - FastifyRequest containing the seller ID in the parameters and update data in the body
     * @param reply - FastifyReply
     * @returns A promise that resolves to the seller ID.
     */
    async updateSeller(
        request: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            // Validate ID
            const validatedId = idSchema.parse(request.params.id);

            // Parse the body and ensure the name field is properly extracted
            const { name } = SellerUpdateInputSchema.parse(request.body);

            // Check if 'name' is a valid string, it's required in the schema
            if (!name || typeof name !== "string") {
                return reply.status(400).send({ message: "Invalid seller name provided." });
            }

            // Find the seller by name
            const existingSeller = await sellerService.findSellerByName(name);

            // If an existing seller is found and the id doesn't match, return its ID
            if (existingSeller && existingSeller.id !== validatedId) {
                return reply.send(existingSeller);
            }

            // Proceed with updating the seller
            const updatedSeller = await sellerService.updateSeller(validatedId, { name });
            reply.send(updatedSeller);
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to update seller");
        }
    }

    /**
     * Delete a seller by ID.
     * @param request - FastifyRequest containing the seller ID in the parameters
     * @param reply - FastifyReply
     * @returns A promise that resolves to a confirmation message.
     */
    async deleteSeller(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<void> {
        try {
            // Validate the seller ID
            const validatedId = idSchema.parse(request.params.id);

            // Attempt to delete the seller
            const deletedSeller = await sellerService.deleteSeller(validatedId);

            if (!deletedSeller) {
                return reply.status(404).send({ message: "Seller not found" });
            }

            reply.send({ message: "Seller deleted successfully" });
        } catch (error) {
            sendErrorResponse(reply, error, "Failed to delete seller");
        }
    }
}
