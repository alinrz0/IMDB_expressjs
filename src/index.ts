import express, { Request, Response } from 'express';
import sequelize from './db'; // Import the sequelize instance from db.ts

import {authControllers} from './auth';
import ErrorHandelingMid  from './middlewares/ErrorHandelingMid';

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.json());

// Function to authenticate and sync the database
const initializeDatabase = async () => {
  try {
    // Authenticate the connection once
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync the models (create tables if they don't exist)
    await sequelize.sync();
    console.log('Database tables are synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database or sync:', error);
  }
};

// Initialize the database
initializeDatabase();

app.use("/auth" ,authControllers);


app.use(ErrorHandelingMid)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
