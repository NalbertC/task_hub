import { Router } from "express";
import multer from "multer";
import multerConfig from "../configs/multer";
import PerfilController from "../controllers/PerfilController";

const uploadsRoutes = Router();

uploadsRoutes.get("/", PerfilController.index);
uploadsRoutes.post(
  "/upload/usuario/:id",
  multer(multerConfig).single("file"),
  PerfilController.create
);

export { uploadsRoutes };
