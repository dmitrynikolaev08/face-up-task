import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';

// Load environment variables
dotenv.config();

const app = express();
app.use(json());

// Simple route for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
