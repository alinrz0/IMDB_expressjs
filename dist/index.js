"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the required modules
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse incoming request bodies
app.use(express_1.default.json());
// Define a simple route for the root
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Define another route for an API endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'This is an API endpoint' });
});
// Define a POST route to handle data from the client
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ receivedData: data });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
