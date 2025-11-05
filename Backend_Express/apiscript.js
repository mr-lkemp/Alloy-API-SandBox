// Simple Alloy Sandbox API Integration using fetch()
// Node.js v18+ supports fetch natively
// This file handles sending applicant data to the Alloy sandbox API
// and returning the response for use in the backend.

// API URL for Alloy sandbox evaluations
const API_URL = "ENTER ALLOY SANDBOX URL"; 

// API credentials (can use environment variables for security)
const TOKEN = process.env.ALLOY_TOKEN || "ENTER ALLOY TOKEN";   // better to use env vars
const SECRET = process.env.ALLOY_SECRET || "ENTER ALLOY SECRET";

// Send POST request to Alloy API
async function submitApplicant(applicant) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
// Use Basic Auth with token and secret
      "Authorization": "Basic " + Buffer.from(`${TOKEN}:${SECRET}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicant), // Send applicant data as JSON
  });

// Parse the JSON response
  const data = await res.json();

// If response is not OK (status >= 400), throw an error with details
  if (!res.ok) throw new Error(`Error ${res.status}: ${JSON.stringify(data)}`);

// Return the parsed data to be handled by server.js
  return data;
}

// Export the function so server.js can import and use it
module.exports = { submitApplicant };
