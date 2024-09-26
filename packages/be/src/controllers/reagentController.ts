import { FastifyRequest, FastifyReply } from "fastify";
import * as reagentService from "../services/reagentService";

// TODO:=>  Get all reagents
export const index = async (req: FastifyRequest, reply: FastifyReply) => {
    const reagents = await reagentService.index();
    reply.send(reagents);
};

// TODO:=>  Get single reagent
export const show = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    const reagent = await reagentService.show(req.params.id);
    if (reagent) {
        reply.send(reagent);
    } else {
        reply.status(404).send({ message: "Reagent not found" });
    }
};

// TODO:=>  Create reagent
export const store = async (req: FastifyRequest, reply: FastifyReply) => {
    const newReagent = await reagentService.store(req.body);
    reply.status(201).send(newReagent);
};

// TODO:=>  Update reagent
export const update = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    const updatedReagent = await reagentService.update(req.params.id, req.body);
    reply.send(updatedReagent);
};

// TODO:=>  Delete reagent
export const destroy = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
) => {
    await reagentService.destroy(req.params.id);
    reply.status(204).send();
};
