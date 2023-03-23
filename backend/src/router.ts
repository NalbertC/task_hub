import Fastify from "fastify";

const routes = Fastify({
  logger: true,
});

routes.get("/", async (req, res) => {
  return { hello: "world!" };
});

export { routes };
