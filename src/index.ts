import fastify, { FastifyInstance } from "fastify";
import { SWAGGER_URL } from "./config";
import { swaggerPlugins } from "./plugins/swagger/index";
import * as routeModules from "./routes";

const server = fastify({ logger: true });

server.get("/", (_req, resp) => {
  resp.send("Welcome!!!");
});

const start = async () => {
  try {
    // Routes
    await swaggerPlugins(server, { routePrefix: SWAGGER_URL });

    registerRoutes(server);

    server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();

const registerRoutes = (app: FastifyInstance) => {
  app.log.info("Registering routes...");
  for (const routeModule of Object.values(routeModules)) {
    let routes;
    if (routeModule) routes = Object.values(routeModule)[0];
    app.register(routes);
  }
};
