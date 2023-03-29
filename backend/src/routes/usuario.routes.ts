import { Router } from "express";
import DiasController from "../controllers/DiasController";
import UsuariosController from "../controllers/UsuariosController";

const usuarioRoutes = Router();

usuarioRoutes.get("/", UsuariosController.index);
usuarioRoutes.get("/:id", UsuariosController.usuario);
usuarioRoutes.post("/", UsuariosController.create);
usuarioRoutes.get("/:id/dia/summary", DiasController.summary);

export { usuarioRoutes };
