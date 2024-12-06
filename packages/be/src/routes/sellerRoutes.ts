import { FastifyZodInstance } from "../types";
import { SellerController } from "../controllers/sellerController";
import {
    SellerCreateInputSchema,
    SellerUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { SellerSearchSchema } from "../../../shared/zodSchemas/seller/sellerSearchSchema";

const sellerController = new SellerController();

/**
 * Registers the seller routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const sellerRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET /sellers - Retrieves all sellers with optional search filters.
     *
     * @query {typeof SellerSearchSchema} Querystring - Search and pagination filters for sellers.
     * @returns {Promise<void>} A list of sellers.
     */
    app.get<{ Querystring: typeof SellerSearchSchema }>(
        "/",
        {
            schema: { tags: ["Seller"] },
        },
        async (request, reply) => {
            return await sellerController.getAllSellers(request, reply);
        },
    );

    /**
     * POST /sellers - Creates a new seller or returns an existing seller's ID if the name is not unique.
     *
     * @body {typeof SellerCreateInputSchema} Body - The seller data to create.
     * @returns {Promise<void>} The ID of the created or existing seller.
     */
    app.post<{ Body: { name: string } }>(
        "/",
        {
            schema: { tags: ["Seller"], body: SellerCreateInputSchema },
        },
        async (request, reply) => {
            return await sellerController.createSeller(request, reply);
        },
    );

    /**
     * PUT /sellers/:id - Updates an existing seller by ID.
     *
     * @param {string} id - The ID of the seller to update.
     * @body {typeof SellerUpdateInputSchema} Body - The updated data for the seller.
     * @returns {Promise<void>} The ID of the updated or matched existing seller.
     */
    app.put<{ Params: { id: string }; Body: { name: string } }>(
        "/:id",
        {
            schema: { tags: ["Seller"], body: SellerUpdateInputSchema },
        },
        async (request, reply) => {
            return await sellerController.updateSeller(request, reply);
        },
    );

    /**
     * DELETE /sellers/:id - Deletes a seller by ID.
     *
     * @param {string} id - The ID of the seller to delete.
     * @returns {Promise<void>} A confirmation message indicating the result.
     */
    app.delete<{ Params: { id: string } }>(
        "/:id",
        {
            schema: { tags: ["Seller"] },
        },
        async (request, reply) => {
            return await sellerController.deleteSeller(request, reply);
        },
    );
};
