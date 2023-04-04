import { Router } from "express";
import SenhaController from "../controllers/SenhaController";

const passRoutes = Router();

passRoutes.post("/recuperar", SenhaController.recuperar);
passRoutes.post("/resetar", SenhaController.resetar);

export { passRoutes };
