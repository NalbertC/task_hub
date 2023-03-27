import cors from "@fastify/cors";
import dotenv from "dotenv";
import Fastify from "fastify";
import { serverRoutes } from "./router";

dotenv.config();

const server = Fastify({
  logger: true,
});

//---- middleware---------------
server.register(cors);
server.register(serverRoutes);

// -----------------------------

server.get("/", () => {
  return { hello: "world!" };
});
//------------------------------
server
  .listen({
    port: Number(process.env.API_PORT),
  })
  .then(() => {
    console.log(
      `Server running in ${process.env.API_HOST}:${process.env.API_PORT}`
    );
  });
