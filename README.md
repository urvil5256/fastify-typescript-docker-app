# fastify-typescript-docker-app

### To create and start docker container of node app and postgress db

```bash
npm run db:start
```

### To migrate existing tables

```bash
npm run migrate
```

### To create a new migration (Table)

```bash
npm run migrate:make
```

### To undo changes made by migration

```bash
npm run rollback
```

### To analyzing the code to find and fix potential errors, enforce coding standards, and improve code quality (Only for development perpose)

```bash
npm run lint
```

## List of endpoints

- `/`: endpoint used to check status
- `/docs`: documentation for all endpoints

## Installing dependencies

```
npm install
```

### To run app locally

- To run locally set `POSTGRES_HOST=localhost` then perform below command

- To run from docker container set `POSTGRES_HOST=postgres_db` then perform below command

```bash
npm run dev
```

## Build production app

```
npm run build
```

## Run the service locally in production mode

```
npm start
```

## Project structure

This is node project structure which are located `./src`. The packages are:

- `modals` - contains all table schema that are used in this project.
- `plugins` - contains all fastify plugins which are used for database connection, JWT authentication and swagger-ui.
- `routes` - contains the routes which handles request, responses.
- `schema` - contains request, response schema which are used in swagger.
- `services` - contains functions which are perform database queries to insert, update, delete and fetch the data.
- `utils` - contains the enums.
- `config` - contains the configuration variables.

## Environment

- `POSTGRES_USER=`
- `POSTGRES_PASSWORD=`
- `POSTGRES_PORT=`
- `POSTGRES_DB=`
- `POSTGRES_HOST=`
- `DEFAULT_ROLE=`
- `JWT_SECRET=`
