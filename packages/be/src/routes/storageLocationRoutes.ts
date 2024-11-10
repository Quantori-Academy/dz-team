import { FastifyZodInstance, Roles } from "../types";

import {
    StorageLocationCreateInputSchema,
    StorageLocationUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { StorageLocationSearchSchema } from "../../../shared/zodSchemas";

import { StorageLocationController } from "../controllers/storageLocationController";
import { checkAuthenticated, checkAuthenticatedAndRole } from "../utils/authCheck";

const storageLocationController = new StorageLocationController();

/**
 * Registers the storage location routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const storageLocationRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * GET / - Retrieves all storage locations.
     * Requires authentication.
     *
     * @query {typeof StorageLocationSearchSchema} Querystring - Search filters for storage locations.
     * @returns {Promise<void>} A list of storage locations.
     */
    app.get<{ Querystring: typeof StorageLocationSearchSchema }>(
        "/",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [checkAuthenticated()],
        },
        async (request, reply) => {
            return await storageLocationController.getStorageLocations(request, reply);
        },
    );

    /**
     * GET /:id - Retrieves a single storage location by its ID.
     * Requires authentication.
     *
     * @param {string} id - The ID of the storage location to retrieve.
     * @returns {Promise<void>} The requested storage location.
     */
    app.get<{ Params: { id: string } }>(
        "/:id",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [checkAuthenticated()],
        },
        async (request, reply) => {
            return await storageLocationController.getStorageLocation(request, reply);
        },
    );

    /**
     * POST / - Creates a new storage location.
     * Requires ADMIN role.
     *
     * @body {typeof StorageLocationCreateInputSchema} Body - The data to create a storage location.
     * @returns {Promise<void>} The created storage location.
     */
    app.post<{ Body: typeof StorageLocationCreateInputSchema }>(
        "/",
        {
            schema: { tags: ["StorageLocation"], body: StorageLocationCreateInputSchema },
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await storageLocationController.createStorageLocation(request, reply);
        },
    );

    /**
     * PUT /:id - Updates an existing storage location by its ID.
     * Requires ADMIN role.
     *
     * @param {string} id - The ID of the storage location to update.
     * @body {typeof StorageLocationUpdateInputSchema} Body - The updated data for the storage location.
     * @returns {Promise<void>} The updated storage location.
     */
    app.put<{ Params: { id: string }; Body: typeof StorageLocationUpdateInputSchema }>(
        "/:id",
        {
            schema: { tags: ["StorageLocation"], body: StorageLocationUpdateInputSchema },
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await storageLocationController.updateStorageLocation(request, reply);
        },
    );

    /**
     * DELETE /:id - Deletes a storage location by its ID.
     * Requires ADMIN role.
     *
     * @param {string} id - The ID of the storage location to delete.
     * @returns {Promise<void>} A success message or error if the location is not found.
     */
    app.delete<{ Params: { id: string } }>(
        "/:id",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await storageLocationController.deleteStorageLocation(request, reply);
        },
    );

    /**
     * PATCH /:id - Restores a previously deleted storage location by its ID.
     * Requires ADMIN role.
     *
     * @param {string} id - The ID of the storage location to restore.
     * @returns {Promise<void>} The restored storage location, if successful.
     */
    app.patch<{ Params: { id: string } }>(
        "/:id",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await storageLocationController.undoDeleteStorageLocation(request, reply);
        },
    );

    /**
     * PUT /:reagentId/move - Moves a reagent to a new storage location.
     * Requires ADMIN role.
     *
     * @param {string} reagentId - The ID of the reagent to move.
     * @body {Object} Body - Contains the ID of the new storage location.
     * @body {string} Body.newStorageLocationId - The ID of the new storage location.
     * @returns {Promise<void>} The updated reagent location information.
     */
    app.put<{ Params: { reagentId: string }; Body: { newStorageLocationId: string } }>(
        "/:reagentId/move",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [checkAuthenticatedAndRole([Roles.ADMIN])],
        },
        async (request, reply) => {
            return await storageLocationController.moveReagent(request, reply);
        },
    );
};