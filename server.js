/*
  Vulnerable example server (for lab)
  - intentionally contains hardcoded "secrets" and debug routes
  - use only for educational local lab
*/
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// --- BAD: hardcoded secrets (only demo, do not use real keys) ---
const API_KEY = "super-secret-api-key-12345";
const DB_PASSWORD = "P@s5w0rd_demo";

// config.json (we will create it and commit it initially for lab)
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

app.get('/', (req, res) => {
  res.send('Hello — vulnerable server');
});

// DEBUG: exposes config (contains secrets) --- intentionally vulnerable
app.get('/debug/config', (req, res) => {
  res.json(config);
});

// cause an error to show stack trace
app.get('/cause-error', (req, res) => {
  throw new Error("Simulated internal error: DB password is " + DB_PASSWORD);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
