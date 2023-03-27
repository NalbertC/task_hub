import { FastifyInstance } from "fastify";

import TarefasController from "../controllers/TarefasController";

export async function tarefasRoutes(routes: FastifyInstance) {
  routes.get("/tarefas", TarefasController.index);
  routes.post("/tarefas", TarefasController.create);
  routes.patch("/tarefas/:id/toggle", TarefasController.toggle);
}
