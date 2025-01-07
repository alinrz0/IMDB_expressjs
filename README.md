# IMDB Backend Project

## Description
A basic backend system for an IMDb-like application. This project uses Node.js and TypeScript to handle core functionalities such as user authentication, movie management, and review handling. It integrates with a MySQL database via Sequelize ORM and includes tools for validation, security, and testing.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Scripts](#scripts)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory and add your configuration variables such as:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=imdb_clone
   JWT_SECRET=your_jwt_secret
   ```

3. Initialize the database:
   Run the following Sequelize CLI command to migrate the database schema:
   ```bash
   npx sequelize-cli db:migrate
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the application:
   ```bash
   npm start
   ```

## Usage

- For development, use the following command to watch for changes and automatically restart:
  ```bash
  npm run dev
  ```

- To run the application in production mode:
  ```bash
  npm start
  ```

## Features

- **User Authentication**: Register, login, and manage user sessions using JWT.
- **Movie Management**: Add, update, and retrieve movie details.
- **Error Handling**: Graceful error responses for API endpoints.
- **Logging**: Application logs with Winston.

## Dependencies

Install the required dependencies using:
```bash
npm install @sequelize/core@7.0.0-alpha.43 @types/bcrypt@5.0.2 @types/cookie-parser@1.4.8 @types/cors@2.8.17 @types/express@5.0.0 @types/jest@29.5.14 @types/jsonwebtoken@9.0.7 @types/multer@1.4.12 @types/node@22.10.5 @types/sequelize@4.28.20 @types/validator@13.12.2 bcrypt@5.1.1 class-transformer@0.5.1 class-validator@0.14.1 cookie-parser@1.4.7 cord@1.0.1 cors@2.8.5 ejs@3.1.10 express@4.21.2 jest@29.7.0 jsonwebtoken@9.0.2 multer@1.4.5-lts.1 mysql2@3.12.0 nodemon@3.1.9 sequelize-cli@6.6.2 sequelize@6.37.5 supertest@7.0.0 ts-jest@29.2.5 ts-node@10.9.2 typescript@5.7.2 winston@3.17.0
```

## Scripts

The following scripts are available in the project:

- **`npm test`**: Runs unit and integration tests.
- **`npm run dev`**: Runs the application in development mode, watching for changes in TypeScript files.
- **`npm run build`**: Compiles TypeScript files to JavaScript in the `dist/` directory.
- **`npm start`**: Starts the application in production mode by running the compiled JavaScript code from `dist/`.
- **`npx sequelize-cli db:migrate`**: Runs database migrations.


## Authors

- ali norouzi ([alinorouzi725@gmail.com](mailto:alinorouzi725@gmail.com))


