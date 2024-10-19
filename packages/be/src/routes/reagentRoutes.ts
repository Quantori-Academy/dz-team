import { ReagentCreateInputSchema, ReagentUpdateInputSchema } from "shared/generated/zod";
import { ReagentController } from "../controllers/reagentController";
import { FastifyZodInstance } from "../types";

const reagentController = new ReagentController();

/**
 * Registers the reagent routes with the provided Fastify instance.
 *
 * @param {FastifyZodInstance} app - The Fastify instance to register the routes with.
 * @returns {Promise<void>} A promise that resolves when the routes have been registered.
 */
export const reagentRoutes = async (app: FastifyZodInstance): Promise<void> => {
    /**
     * @route GET /:id
     * @tags Reagent
     * @summary Get a specific reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @returns {Reagent} 200 - The requested reagent
     * @returns {Error} 404 - Reagent not found
     */
    app.get<{ Params: { id: string } }>(
        "/:id",
        { schema: { tags: ["Reagent"] } },
        async (request, reply) => {
            return await reagentController.getReagent(request, reply);
        },
    );

    /**
     * @route GET /
     * @tags Reagent
     * @summary Get all reagents.
     * @returns {Reagent[]} 200 - An array of reagents
     */
    app.get("/", { schema: { tags: ["Reagent"] } }, async (request, reply) => {
        return await reagentController.getReagents(request, reply);
    });

    /**
     * @route POST /
     * @tags Reagent
     * @summary Create a new reagent.
     * @param {ReagentCreateInputSchema} request.body.required - Reagent data to create
     * @returns {Reagent} 201 - The created reagent
     * @returns {Error} 400 - Validation error
     */
    app.post<{ Body: typeof ReagentCreateInputSchema }>(
        "/",
        { schema: { tags: ["Reagent"], body: ReagentCreateInputSchema } },
        async (request, reply) => {
            return await reagentController.createReagent(request, reply);
        },
    );

    /**
     * @route PUT /:id
     * @tags Reagent
     * @summary Update an existing reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @param {ReagentUpdateInputSchema} request.body.required - Data to update the reagent
     * @returns {Reagent} 200 - The updated reagent
     * @returns {Error} 404 - Reagent not found
     * @returns {Error} 400 - Validation error
     */
    app.put<{ Params: { id: string }; Body: typeof ReagentUpdateInputSchema }>(
        "/:id",
        { schema: { tags: ["Reagent"], body: ReagentUpdateInputSchema } },
        async (request, reply) => {
            return await reagentController.updateReagent(request, reply);
        },
    );

    /**
     * @route DELETE /:id
     * @tags Reagent
     * @summary Soft delete a reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @returns {Reagent} 200 - The deleted reagent
     * @returns {Error} 404 - Reagent not found
     */
    app.delete<{ Params: { id: string } }>(
        "/:id",
        { schema: { tags: ["Reagent"] } },
        async (request, reply) => {
            return await reagentController.deleteReagent(request, reply);
        },
    );

    /**
     * @route PATCH /:id
     * @tags Reagent
     * @summary Undo the soft delete of a reagent by ID.
     * @param {string} id.params.required - Reagent ID
     * @returns {Reagent} 200 - The restored reagent
     * @returns {Error} 404 - Reagent not found
     */
    app.patch<{ Params: { id: string } }>(
        "/:id",
        { schema: { tags: ["Reagent"] } },
        async (response, reply) => {
            return await reagentController.undoDeleteReagent(response, reply);
        },
    );
};
