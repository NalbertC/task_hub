import { Router } from "express";
import SessionsController from "../controllers/SessionsController";

const sessionRoutes = Router();

sessionRoutes.post("/", SessionsController.create);

export { sessionRoutes };
