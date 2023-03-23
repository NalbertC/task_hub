import cors from "@fastify/cors";
import dotenv from "dotenv";
import Fastify from "fastify";
import TarefasController from "./controllers/TarefasController";
dotenv.config();

const server = Fastify();

//---- middleware---------------
server.register(cors);

// -----------------------------

server.get("/tarefas", TarefasController.index);

//------------------------------
server
  .listen({
    port: Number(process.env.API_PORT),
  })
  .then(() => {
    console.log(
      `Server run in ${process.env.API_HOST}:${process.env.API_PORT}`
    );
  });
