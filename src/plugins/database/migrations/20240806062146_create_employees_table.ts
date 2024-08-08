import type { Knex } from "knex";

const TABLE_NAME = "employees";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
    t.string("employee_name").notNullable(),
      // foreign keys
      t.uuid("department_id").nullable();
    t.foreign("department_id")
      .references("id")
      .inTable("departments")
      .onDelete("SET NULL");

    t.integer("salary").notNullable();
    t.string("address", 100).notNullable();
    t.string("city", 100).notNullable();
    t.string("state", 100).notNullable();
    t.string("country", 100).notNullable();
    t.integer("postal_code").notNullable();
    t.integer("phone").notNullable();
    t.string("email").notNullable();

    // Timestamps
    t.timestamps(true, true); // Automatically create `created_at` and `updated_at`

    // uniqueness constraint
    t.unique(["employee_name", "department_id", "email"]);

    // indicies
    t.index(
      ["employee_name", "department_id", "email"],
      "employees_employee_name_department_id_email_index",
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
