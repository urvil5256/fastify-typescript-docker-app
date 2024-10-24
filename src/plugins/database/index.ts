// Database connection plugin
import knex from "knex";
import dbonfig from "../../plugins/database/knexfile";

const db = knex(dbonfig);

export default db;
