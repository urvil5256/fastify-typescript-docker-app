CREATE TABLE IF NOT EXISTS roles (
    "Id" SERIAL PRIMARY KEY,
    "role_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200)
);