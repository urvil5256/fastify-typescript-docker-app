CREATE TABLE IF NOT EXISTS roles (
    "Id" SERIAL PRIMARY KEY,
    "role_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS users (
    "Id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "prefix" VARCHAR(10),
    "role_id" INTEGER REFERENCES roles("Id"),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organization (
    "Id" SERIAL PRIMARY KEY,
    "organizationName" VARCHAR(100) NOT NULL,
    "description" VARCHAR(300),
    "address" VARCHAR(100),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "postalCode" VARCHAR(100),
    "phone" VARCHAR(100),
    "email" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS department (
    "Id" SERIAL PRIMARY KEY,
    "departmentName" VARCHAR(100) NOT NULL,
    "organizationId" INTEGER REFERENCES organization("Id"),
    "description" VARCHAR(300),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee (
    "Id" SERIAL PRIMARY KEY,
    "employeeName" VARCHAR(100) NOT NULL,
    "departmentId" INTEGER REFERENCES department("Id"),
    "salary" INTEGER,
    "address" VARCHAR(100),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "phone" VARCHAR(100),
    "email" VARCHAR(100),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);