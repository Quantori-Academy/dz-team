import { reagentRoutes } from "./reagentRoutes";
import { sampleRoutes } from "./sampleRoutes";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { FastifyZodInstance } from "../types";
import { storageLocationRoutes } from "./storageLocationRoutes";
import { orderRoutes } from "./orderRoutes";
import { combinedListRoutes } from "./combinedListRoutes";

export const apiRoutes = async (app: FastifyZodInstance) => {
    app.register(combinedListRoutes, { prefix: "/list" });
    app.register(reagentRoutes, { prefix: "/reagents" });
    app.register(sampleRoutes, { prefix: "/samples" });
    app.register(authRoutes, { prefix: "/auth" });
    app.register(userRoutes, { prefix: "/users" });
    app.register(storageLocationRoutes, { prefix: "/storage-locations" });
    app.register(orderRoutes, { prefix: "/orders" });
};
