// routes/apiRoutes.ts
import { FastifyInstance } from "fastify";

import { reagentRoutes } from "./reagentRoutes";
import { sampleRoutes } from "./sampleRoutes";

export const apiRoutes = async (app: FastifyInstance) => {
    app.register(reagentRoutes, { prefix: "/reagents" });
    app.register(sampleRoutes, { prefix: "/samples" });
};
