import type { Knex } from "knex";

const TABLE_NAME = "departments";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
    t.string("department_name", 100).notNullable(),
      // foreign keys
      t.uuid("organization_id").nullable();
    t.foreign("organization_id")
      .references("id")
      .inTable("organizations")
      .onDelete("SET NULL");

    // Timestamps
    t.timestamps(true, true); // Automatically create `created_at` and `updated_at`

    // uniqueness constraint
    t.unique(["organization_id", "department_name"]);

    // indicies
    t.index(
      ["organization_id", "department_name"],
      "departments_organization_id_department_name_index",
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
