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