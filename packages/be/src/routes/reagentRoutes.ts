import { FastifyInstance } from "fastify";
import * as reagentController from "../controllers/reagentController";

export const reagentRoutes = async (app: FastifyInstance) => {
    app.get("/reagents", reagentController.index);
    app.get("/reagents/:id", reagentController.show);
    app.post("/reagents", reagentController.store);
    app.put("/reagents/:id", reagentController.update);
    app.delete("/reagents/:id", reagentController.destroy);
};
