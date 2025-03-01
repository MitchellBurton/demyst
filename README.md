# Demyst coding assignment

## Project structure

This project splits the frontend into its own React SPA. The backend is an API using the [tsoa](https://tsoa-community.github.io/docs/) framework on top of express. Both the front and back ends use typescript.

### Types

The back end (in `/api`) uses the tsoa framework to create a OpenAPI file that can be found in `/api/generated/openapi.json`. It also serves a swaggerUI at the `/docs` url.

Types are shared between the front and back end. This is done with a simple import across the file tree, see [./frontend/src//components/BalanceSheetTable.tsx](BalanceSheetTable.tsx) for an example.

In a real production app these types could be packaged up in an npm package, or a client could be generated from the OpenAPI file created be the back end.

## Running the project

### URLs
After running the project in either of the ways outlined below the following URLs are available:

* Frontend: http://localhost:3001
* Backend API: http://localhost:9000/balanceSheetReport
* Backend OpenAPI Docs: http://localhost:9000/docs


### Docker

To run the application using Docker, use the docker-compose file in the root directory:
   ```sh
   docker-compose up --build
   ```

### Locally

You can also run the project without docker containers:

1. Run the mock xero api:
```sh
docker run -p 3000:3000 jaypeng2015/show-me-the-money
```

2. Run the backend api:
```sh
cd api
npm run dev
```

3. Run the frontend:
```sh
cd frontend
npm run dev
```

## Tests
Tests can be run in either the frontend or backend with `npm test`.