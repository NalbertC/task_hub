import Fastify from "fastify";

const routes = Fastify();

routes.get("/", async (req, res) => {
  return { hello: "world!" };
});

export { routes };
