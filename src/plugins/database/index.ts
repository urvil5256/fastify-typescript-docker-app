// Database connection plugin
import dotenv from "dotenv";
import { DATABASE_URL } from "../../config";

const fastifyPostgres = require("@fastify/postgres");
dotenv.config();

const dbConnect = async (server) => {
  try {
    await server.register(fastifyPostgres, {
      connectionString: DATABASE_URL,
    });
    server.log.info("Successfully connected to the database");
  } catch (error) {
    server.log.error(error, "Error connecting to the database");
    process.exit(1);
  }
};

export default dbConnect;
