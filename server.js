// server.js (fixed)
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Secrets from env (not hardcoded!)
const API_KEY = process.env.API_KEY || 'not-set';
const DB_PASSWORD = process.env.DB_PASSWORD || 'not-set';

// Example config structure
let configExample = {};
try {
  configExample = JSON.parse(fs.readFileSync('./config.example.json', 'utf8'));
} catch (e) {}

// Root route
app.get('/', (req, res) => {
  res.send('Hello — fixed server');
});

// Safe debug route (no secrets)
app.get('/debug/config', (req, res) => {
  res.json({
    message: "Config not exposed. See config.example.json for structure.",
    configExample: configExample
  });
});

// Error simulation
app.get('/cause-error', (req, res, next) => {
  try {
    throw new Error("Simulated internal error");
  } catch (err) {
    next(err);
  }
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message, err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
