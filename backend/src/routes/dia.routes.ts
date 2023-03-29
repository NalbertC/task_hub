import DiasController from "../controllers/DiasController";

import { Router } from "express";

const diaRoutes = Router();

diaRoutes.get("/usuario/:id", DiasController.index);

export { diaRoutes };
