import Fastify from "fastify";
import TarefasController from "../controllers/TarefasController";

const routesTarefas = Fastify();

routesTarefas.get("/", TarefasController.index);

export { routesTarefas };
