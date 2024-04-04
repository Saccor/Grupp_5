const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Adjusted to serve the static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handles any requests, sending back the main index.html file from 'frontend/build'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
