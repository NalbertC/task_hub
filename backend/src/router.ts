import { Router } from "express";
import { ensureAutenticado } from "./middleware/auth";
import { diaRoutes } from "./routes/dia.routes";
import { sessionRoutes } from "./routes/session.routes";
import { tarefasRoutes } from "./routes/tarefas.routes";
import { usuarioRoutes } from "./routes/usuario.routes";

const serverRoutes = Router();

// login
serverRoutes.use("/session", sessionRoutes);

serverRoutes.use("/usuario", usuarioRoutes);

serverRoutes.use(ensureAutenticado);
serverRoutes.use("/tarefas", tarefasRoutes);
serverRoutes.use("/dia", diaRoutes);

export { serverRoutes };
