// Import the required modules
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.json());

// Define a simple route for the root
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Define another route for an API endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'This is an API endpoint' });
});

// Define a POST route to handle data from the client
app.post('/api/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ receivedData: data });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
