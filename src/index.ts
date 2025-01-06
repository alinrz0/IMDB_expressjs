import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from './helper/logger';
import sequelize from './db'; // Import the sequelize instance from db.ts
import cookieParser from 'cookie-parser';


import {authControllers} from './auth';
import {movieControllers} from './movie';
import ErrorHandelingMid  from './middlewares/ErrorHandelingMid';

const app = express();
const port = 3000;
declare global {
  var token: { token: string }; // Declaring 'token' as an object with a 'token' field of type string
}


app.use(cookieParser());
// Middleware to parse incoming request bodies
app.use(cors());
app.use(express.json());

// Function to authenticate and sync the database
const initializeDatabase = async () => {
  try {
    // Authenticate the connection once
    await sequelize.authenticate();
    logger.info('Connection to the database has been established successfully.');

    // Sync the models (create tables if they don't exist)
    await sequelize.sync();
    logger.info('Database tables are synchronized.');
  } catch (error) {
    logger.error('Unable to connect to the database or sync:', error);
  }
};

// Initialize the database
initializeDatabase();

app.use("/auth" ,authControllers);
app.use("/movie" ,movieControllers);
//  


app.use(ErrorHandelingMid)

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
