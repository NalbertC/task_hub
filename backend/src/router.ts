import { FastifyInstance } from "fastify";
import { diaRoutes } from "./routes/dia.routes";
import { tarefasRoutes } from "./routes/tarefas.routes";

export async function serverRoutes(routes: FastifyInstance) {
  routes.register(tarefasRoutes);
  routes.register(diaRoutes);
}
