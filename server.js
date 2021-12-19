// server/index.js
import { URL } from 'url'; // in Browser, the URL in native accessible on window
import path from 'path';
import express from 'express';
const app = express();

// Have Node serve client/dist folder as static
app.use(express.static('client/dist'));

// Handle GET requests to /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello From Server!' });
});

// Send all non-api GET requests to react app
const __dirname = new URL('.', import.meta.url).pathname;
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
