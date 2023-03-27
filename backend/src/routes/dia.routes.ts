import { FastifyInstance } from "fastify";
import DiasController from "../controllers/DiasController";

export async function diaRoutes(routes: FastifyInstance) {
  routes.get("/dia", DiasController.index);
  routes.get("/summary", DiasController.summary);
}
