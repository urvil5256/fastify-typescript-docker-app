CREATE TABLE IF NOT EXISTS department (
    "Id" SERIAL PRIMARY KEY,
    "departmentName" VARCHAR(100) NOT NULL,
    "organizationId" INTEGER REFERENCES organization("Id"),
    "description" VARCHAR(300),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);