import type { Knex } from "knex";

const TABLE_NAME = "employees";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE OR REPLACE FUNCTION update_timestamp()
        RETURNS TRIGGER
        LANGUAGE plpgsql
        AS
        $$
        BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
        END;
        $$;
    `);
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
    t.string("employee_name").notNullable();
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
    t.string("postal_code", 20).notNullable();
    t.string("phone", 10).notNullable();
    t.string("email").notNullable();

    // Timestamps
    t.timestamps(true, true); // Automatically create `created_at` and `updated_at`

    // uniqueness constraint
    t.unique(["employee_name", "email"]);

    // indicies
    t.index(["employee_name", "email"], "employees_employee_name_email_index");
  });
  await knex.raw(`
        CREATE TRIGGER update_timestamp_employee
        BEFORE UPDATE
        ON employees
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
