import type { Knex } from "knex";

const TABLE_NAME = "roles";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
    t.string("role_name", 50).notNullable();
    t.text("description");

    // uniqueness constraint
    t.unique(["role_name"]);

    // indicies
    t.index(["role_name"], "roles_role_name_index");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
