import { Router } from "express";
import { ensureAutenticado } from "./middleware/auth";
import { diaRoutes } from "./routes/dia.routes";
import { sessionRoutes } from "./routes/session.routes";
import { tarefasRoutes } from "./routes/tarefas.routes";
import { uploadsRoutes } from "./routes/uploads.routes";
import { usuarioRoutes } from "./routes/usuario.routes";

const serverRoutes = Router();

// login
serverRoutes.use("/session", sessionRoutes);

serverRoutes.use("/usuario", usuarioRoutes);

// serverRoutes.use(ensureAutenticado);
serverRoutes.use("/tarefas", ensureAutenticado, tarefasRoutes);
serverRoutes.use("/dia", ensureAutenticado, diaRoutes);
serverRoutes.use("/uploads", ensureAutenticado, uploadsRoutes);

export { serverRoutes };
