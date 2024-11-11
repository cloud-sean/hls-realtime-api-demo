import express from 'express';
import path from 'path';
import { RealtimeRelay } from './relay-server/lib/relay.js';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ override: true });

// Load environment variables
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT; // Azure OpenAI endpoint
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT; // Azure deployment name

if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_DEPLOYMENT) {
  console.error(
    `Environment variables "OPENAI_API_KEY", "OPENAI_ENDPOINT", and "OPENAI_DEPLOYMENT" are required.\n` +
      `Please set them in your .env file or Azure App Settings.`,
  );
  process.exit(1);
}

const PORT = process.env.PORT || 8081;
const HOST = process.env.WEBSITE_HOSTNAME || 'localhost';

// Initialize the Express app
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.send('OK');
});

// Endpoint to return the React app for any request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Initialize the Realtime Relay with Azure configurations
const relay = new RealtimeRelay({
  apiKey: AZURE_OPENAI_API_KEY,
  endpoint: AZURE_OPENAI_ENDPOINT,
  deployment: AZURE_OPENAI_DEPLOYMENT,
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

// Create WebSocket server attached to Express
const wss = new WebSocketServer({
  server,
  path: '/',
});

// Handle WebSocket connections using the connectionHandler method
wss.on('connection', (ws, req) => {
  relay.connectionHandler(ws, req);
});
