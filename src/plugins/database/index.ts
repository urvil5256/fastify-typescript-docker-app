// Database connection plugin
import dotenv from "dotenv";

const fastifyPostgres = require("@fastify/postgres");
dotenv.config();

const dbConnect = async (server) => {
  try {
    await server.register(fastifyPostgres, {
      connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    });
    server.log.info("Successfully connected to the database");
  } catch (error) {
    server.log.error(error, "Error connecting to the database");
    process.exit(1);
  }
};

export default dbConnect;
