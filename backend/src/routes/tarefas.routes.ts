import { Router } from "express";
import TarefasController from "../controllers/TarefasController";

const tarefasRoutes = Router();

tarefasRoutes.get("/usuario/:id", TarefasController.index);
tarefasRoutes.post("/usuario/:id", TarefasController.create);
tarefasRoutes.patch("/:idT/usuario/:idU/toggle", TarefasController.toggle);
export { tarefasRoutes };
