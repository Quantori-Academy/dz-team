import { reagentRoutes } from "./reagentRoutes";
import { sampleRoutes } from "./sampleRoutes";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { FastifyZodInstance } from "../types";

export const apiRoutes = async (app: FastifyZodInstance) => {
    app.register(reagentRoutes, { prefix: "/reagents" });
    app.register(sampleRoutes, { prefix: "/samples" });
    app.register(authRoutes, { prefix: "/auth" });
    app.register(userRoutes, { prefix: "/users" });
};
