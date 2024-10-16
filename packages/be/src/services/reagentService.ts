import { Prisma, PrismaClient } from "@prisma/client";
import {
    ReagentCreateInputSchema,
    ReagentUpdateInputSchema,
} from "shared/generated/zod/inputTypeSchemas";
import { Reagent } from "shared/generated/zod/modelSchema";

const prisma = new PrismaClient();

export class ReagentService {
    /**
     * Get a specific reagent by its ID.
     * @param {string} id - The UUID of the reagent to retrieve.
     * @returns {Promise<Reagent | null>} The reagent or null if not found.
     */
    async getReagent(id: string): Promise<Reagent | null> {
        return await prisma.reagent.findUnique({ where: { id, deletedAt: null } });
    }

    /**
     * Get all reagents that are not deleted.
     * @returns {Promise<Reagent[]>} An array of all non-deleted reagents.
     */
    async getAllReagents(): Promise<Reagent[]> {
        return await prisma.reagent.findMany({ where: { deletedAt: null } });
    }

    /**
     * Create a new reagent.
     * @param {unknown} newReagentData - The data to create a new reagent.
     * @returns {Promise<Reagent>} The newly created reagent.
     */
    async createReagent(newReagentData: Prisma.ReagentCreateInput): Promise<Reagent> {
        const validatedData = ReagentCreateInputSchema.parse(newReagentData);

        return await prisma.reagent.create({ data: validatedData });
    }

    /**
     * Update an existing reagent by its ID.
     * @param {string} id - The UUID of the reagent to update.
     * @param {unknown} updateReagentData - The data to update the reagent.
     * @returns {Promise<Reagent>} The updated reagent.
     */
    async updateReagent(
        id: string,
        updateReagentData: Prisma.ReagentUpdateInput,
    ): Promise<Reagent> {
        const validatedData = ReagentUpdateInputSchema.parse(updateReagentData);

        return await prisma.reagent.update({
            where: { id, deletedAt: null },
            data: validatedData,
        });
    }

    /**
     * Soft delete a reagent by setting its deletedAt field to the current date.
     * @param {string} id - The UUID of the reagent to delete.
     * @returns {Promise<Reagent>} The soft-deleted reagent.
     */
    async deleteReagent(id: string): Promise<Reagent> {
        return await prisma.reagent.update({ where: { id }, data: { deletedAt: new Date() } });
    }

    /**
     * Undo the soft delete of a reagent by setting its deletedAt field to null.
     * @param {string} id - The UUID of the reagent to restore.
     * @returns {Promise<Reagent>} The restored reagent.
     */
    async undoDeleteReagent(id: string): Promise<Reagent> {
        return await prisma.reagent.update({ where: { id }, data: { deletedAt: null } });
    }
}
