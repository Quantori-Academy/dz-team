import { Prisma, PrismaClient } from "@prisma/client";
import { reagentSchema } from "../schemas/reagentSchema";
import { Reagent } from "../models/reagentModel";

const prisma = new PrismaClient();

// TODO:=>  Get all reagents
export const index = async () => {
    return prisma.reagent.findMany();
};

// TODO:=>  Get single reagent
export const show = async (id: number) => {
    id = Number(id);
    return prisma.reagent.findUnique({
        where: { id },
    });
};

// TODO:=>  Create reagent
export const store = async (data: Reagent) => {
    const validation = reagentSchema.safeParse(data);

    if (!validation.success) {
        throw new Error(JSON.stringify(validation.error.errors));
    }

    return prisma.reagent.create({
        data: validation.data as Prisma.ReagentCreateInput,
    });
};

// TODO:=>  Update reagent
export const update = async (id: number, data: Reagent) => {
    id = Number(id);
    const validation = reagentSchema.partial().safeParse(data);

    if (!validation.success) {
        throw new Error(JSON.stringify(validation.error.errors));
    }

    return prisma.reagent.update({
        where: { id },
        data: validation.data as Prisma.ReagentUpdateInput,
    });
};

// TODO:=>  Delete reagent
export const destroy = async (id: number) => {
    id = Number(id);
    return prisma.reagent.delete({
        where: { id },
    });
};
