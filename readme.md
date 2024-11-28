# Face Up Task

A full-stack web application with user management and notifications built using React, Express, and TypeScript.

## Features

- Report system with file attachments
- API documentation with Swagger UI
- Type-safe API client generation with Orval
- React Query for data fetching and caching
- Tailwind CSS with shadcn/ui components
- Clean Architecture with TypeScript
- SQLite database with Prisma ORM

## How to run

1. Run `npm install` in the root directory to install dependencies.
2. Run `npx prisma generate` in the backend directory to generate the Prisma client.
3. Run `npm run generate` in the frontend directory to generate the API client.
4. Run `npm run dev` in the root directory to start the development server.

Note: The backend uses SQLite as the database, so you don't need to create a database file. The database will be created automatically when you run the migrations.

You'll be able to access:

- The API documentation at `http://localhost:3000/api-docs`.
- The React app at `http://localhost:5173`.

## Database seeding

1. Run `npm run db:reset` to reset the database.
2. Run `npm run db:seed` to seed the database with some data.

Note: You won't be able to access the files uploaded by the users in the seed data because they are stored locally in the backend directory.

## Potential improvements

1. Migrate to a more robust database like PostgreSQL.
2. Store uploaded files on a cloud storage service like AWS S3.
