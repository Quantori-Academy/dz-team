import { FastifyZodInstance, Roles } from "../types";

import {
    StorageLocationCreateInputSchema,
    StorageLocationUpdateInputSchema,
} from "../../../shared/generated/zod/inputTypeSchemas";
import { StorageLocationSearchSchema } from "../../../shared/zodSchemas";

import { StorageLocationController } from "../controllers/storageLocationController";

const storageLocationController = new StorageLocationController();

/**
 * Registers the storage location routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const storageLocationRoutes = async (app: FastifyZodInstance): Promise<void> => {
    // Route for retrieving all storage locations
    app.get<{ Querystring: typeof StorageLocationSearchSchema }>(
        "/",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [
                async (request, reply) => {
                    if (!app.verifyJWT) {
                        reply.code(500).send({
                            error: "Authentication or authorization method not available",
                        });
                        throw new Error(
                            "Required authentication or authorization method not registered.",
                        );
                    }
                    await app.verifyJWT(request, reply);
                },
            ],
        },
        async (request, reply) => {
            return await storageLocationController.getStorageLocations(request, reply);
        },
    );

    // Route for retrieving a single storage location by ID
    app.get<{ Params: { id: string } }>(
        "/:id",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [
                async (request, reply) => {
                    if (!app.verifyJWT) {
                        reply.code(500).send({
                            error: "Authentication or authorization method not available",
                        });
                        throw new Error(
                            "Required authentication or authorization method not registered.",
                        );
                    }
                    await app.verifyJWT(request, reply);
                },
            ],
        },
        async (request, reply) => {
            return await storageLocationController.getStorageLocation(request, reply);
        },
    );

    // Protected route for creating a new storage location (only ADMIN)
    app.post<{ Body: typeof StorageLocationCreateInputSchema }>(
        "/",
        {
            schema: { tags: ["StorageLocation"], body: StorageLocationCreateInputSchema },
            preHandler: [
                async (request, reply) => {
                    // Ensure verifyJWT and verifyRole exist, otherwise block the request
                    if (!app.verifyJWT || !app.verifyRole) {
                        reply.code(500).send({
                            error: "Authentication or authorization method not available",
                        });
                        throw new Error(
                            "Required authentication or authorization method not registered.",
                        );
                    }
                    await app.verifyJWT(request, reply);

                    await app.verifyRole(request, reply, [Roles.ADMIN]);
                },
            ],
        },
        async (request, reply) => {
            return await storageLocationController.createStorageLocation(request, reply);
        },
    );

    // Protected route for updating an existing storage location (only ADMIN)
    app.put<{ Params: { id: string }; Body: typeof StorageLocationUpdateInputSchema }>(
        "/:id",
        {
            schema: { tags: ["StorageLocation"], body: StorageLocationUpdateInputSchema },
            preHandler: [
                async (request, reply) => {
                    // Ensure verifyJWT and verifyRole exist, otherwise block the request
                    if (!app.verifyJWT || !app.verifyRole) {
                        reply.code(500).send({
                            error: "Authentication or authorization method not available",
                        });
                        throw new Error(
                            "Required authentication or authorization method not registered.",
                        );
                    }
                    await app.verifyJWT(request, reply);
                    await app.verifyRole(request, reply, [Roles.ADMIN]);
                },
            ],
        },
        async (request, reply) => {
            return await storageLocationController.updateStorageLocation(request, reply);
        },
    );

    // Protected route for deleting a storage location (only ADMIN)
    app.delete<{ Params: { id: string } }>(
        "/:id",
        {
            schema: { tags: ["StorageLocation"] },
            preHandler: [
                async (request, reply) => {
                    // Ensure verifyJWT and verifyRole exist, otherwise block the request
                    if (!app.verifyJWT || !app.verifyRole) {
                        reply.code(500).send({
                            error: "Authentication or authorization method not available",
                        });
                        throw new Error(
                            "Required authentication or authorization method not registered.",
                        );
                    }

                    await app.verifyJWT(request, reply);
                    await app.verifyRole(request, reply, [Roles.ADMIN]);
                },
            ],
        },
        async (request, reply) => {
            return await storageLocationController.deleteStorageLocation(request, reply);
        },
    );

    // Protected route for moving a reagent to a new storage location (only ADMIN)
    app.put<{ Params: { reagentId: string }; Body: { newStorageLocationId: string } }>(
        "/:reagentId/move",
        {
            preHandler: [
                async (request, reply) => {
                    // Ensure verifyJWT and verifyRole exist, otherwise block the request
                    if (!app.verifyJWT || !app.verifyRole) {
                        reply.code(500).send({
                            error: "Authentication or authorization method not available",
                        });
                        throw new Error(
                            "Required authentication or authorization method not registered.",
                        );
                    }

                    await app.verifyJWT(request, reply);
                    await app.verifyRole(request, reply, [Roles.ADMIN]);
                },
            ],
        },
        async (request, reply) => {
            return await storageLocationController.moveReagent(request, reply);
        },
    );
};
