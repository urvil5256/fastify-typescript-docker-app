import type { Knex } from "knex";

const TABLE_NAME = "organizations";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
    t.string("organization_name", 100).notNullable();
    t.text("description").nullable();
    t.string("address", 100).notNullable();
    t.string("city", 100).notNullable();
    t.string("state", 100).notNullable();
    t.string("country", 100).notNullable();
    t.string("postal_code", 20).notNullable();
    t.string("phone", 10).notNullable();
    t.string("email").notNullable();

    // uniqueness constraint
    t.unique(["organization_name", "email"]);

    // indicies
    t.index(
      ["organization_name", "email"],
      "organizations_organization_name_email_index"
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
