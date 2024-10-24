import type { Knex } from "knex";
import { DATABASE_URL } from "../../config";

const dbonfig: Knex.Config = {
  client: "pg",
  connection: { connectionString: DATABASE_URL },
  migrations: {
    directory: __dirname + "/migrations",
  },
};
export default dbonfig;
