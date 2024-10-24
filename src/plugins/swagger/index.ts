import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyPluginAsync } from "fastify";

const swaggerPlugins: FastifyPluginAsync<{
  routePrefix: string;
}> = async (api, { routePrefix }) => {
  await api.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Fastify Swagger Demo",
        description:
          "Creating a demo application using fastify typescript with swagger API",
        version: "8.15.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });
  await api.register(fastifySwaggerUi, {
    routePrefix: routePrefix,
    uiConfig: { docExpansion: "list", deepLinking: false },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
};

export { swaggerPlugins };
