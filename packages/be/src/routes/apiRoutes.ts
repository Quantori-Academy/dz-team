import { reagentRoutes } from "./reagentRoutes";
import { sampleRoutes } from "./sampleRoutes";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { FastifyZodInstance } from "../types";
import { storageLocationRoutes } from "./storageLocationRoutes";
import { orderRoutes } from "./orderRoutes";
import { requestRoutes } from "./requestRoutes";
export const apiRoutes = async (app: FastifyZodInstance) => {
    app.register(reagentRoutes, { prefix: "/reagents" });
    app.register(sampleRoutes, { prefix: "/samples" });
    app.register(authRoutes, { prefix: "/auth" });
    app.register(userRoutes, { prefix: "/users" });
    app.register(storageLocationRoutes, { prefix: "/storage-locations" });
    app.register(orderRoutes, { prefix: "/orders" });
    app.register(requestRoutes, { prefix: "/requests" });
};
