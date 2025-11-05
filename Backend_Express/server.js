// Import dependencies
const express = require("express"); // Express framework for handling HTTP requests
const path = require("path");       // Node.js module for working with file and directory paths
const { submitApplicant } = require("./apiScript"); // Import our custom function that calls Alloy API

const app = express();              // Create an Express application

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// ---------------------
// API Route
// ---------------------
// This endpoint receives applicant data from the frontend and submits it to Alloy
app.post("/api/evaluate", async (req, res) => {
  try {
    const data = await submitApplicant(req.body); // Call Alloy API using the data from the request body
    res.json(data);                               // Send the response back to the frontend
  } catch (err) {
    console.error(err);                           // Log error details to the server console
    res.status(500).json({                        // Return a 500 response to the frontend if something fails
      error: "Evaluation failed",
      details: err.message
    });
  }
});

// ---------------------
// Serve Svelte Frontend
// ---------------------
// Serve static files from the Svelte build directory
app.use(express.static(path.join(__dirname, "Frontend_Svelte/dist")));

// ---------------------
// Wildcard Route
// ---------------------
// For single-page applications (SPA), redirect all unknown routes to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "Frontend_Svelte/dist/index.html"));
});

// ---------------------
// Start Server
// ---------------------
const PORT = process.env.PORT || 5000;  // Use environment PORT if available, otherwise default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));