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