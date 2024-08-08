import type { Knex } from "knex";

const TABLE_NAME = "users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
    t.string("firstName", 100).notNullable(),
      t.string("lastName", 100).nullable();
    t.string("email", 100).notNullable();
    t.string("password").notNullable();
    t.string("prefix", 4).notNullable();

    // foreign keys
    t.uuid("role_id").nullable();
    t.foreign("role_id").references("id").inTable("roles").onDelete("SET NULL");

    // Timestamps
    t.timestamps(true, true); // Automatically create `created_at` and `updated_at`

    // uniqueness constraint
    t.unique(["role_id", "email", "password", "prefix"]);

    // indicies
    t.index(
      ["role_id", "email", "created_at"],
      "users_role_email_created_at_index"
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
