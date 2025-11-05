# Alloy-API-SandBox
POS for Alloy API SandBox in JS with Svelte Frontend and Express Backend

A simple full-stack demo using **Express** + **Svelte** to interact with the Alloy Sandbox API.


![App Screenshot](./screenshot.png) 


## Tech Stack
| Frontend | Svelte |
| Backend | Express.js (Node.js) |
| API | Alloy Sandbox API |

##  Project Structure
- `Backend_Express/` — Node.js + Express backend
- `Frontend_Svelte/` — Svelte web UI

alloy-sandbox/
│
├── Backend_Express/
│ ├── server.js # Express server and API routes
│ ├── apiScript.js # Communicates with the Alloy API
│ ├── package.json # Backend dependencies and scripts
│
├── Frontend_Svelte/
│ ├── src/
│ │ └── App.svelte # Main Svelte component and UI logic
│ ├── public/ # Static assets for the frontend
│ └── package.json # Frontend dependencies and scripts
│
└── README.md

##  Getting Started

## Configuration

Update alloy-sandbox => Backend_Express => apiscript.js with your API credentials 

### Environment Variables
- "const TOKEN = process.env.ALLOY_TOKEN || "ENTER ALLOY TOKEN";"
- "const SECRET = process.env.ALLOY_SECRET || "ENTER ALLOY SECRET";"

Update alloy-sandbox => Backend_Express => apiscript.js with your API URI
- "const API_URL = "ENTER ALLOY SANDBOX URL";"

## Setup and Running Locally

### Step 1: Clone the Repository
```bash
git clone
cd alloy-sandbox

### Step 2: Install Backend Dependencies
cd Backend_Express
npm install
npm start

### Step 3: Install Frontend Dependencies
cd Frontend_Svelte
npm install
npm run dev

### Step 4: Build the Frontend
npm run build

### Step 5: Start the Backend Server
cd ../Backend_Express
npm start

Once the server starts, open your browser and go to:
http://localhost:5000

| Outcome       | Message                                                            |
| ------------- | ------------------------------------------------------------------ |
| Approved      | The applicant has been approved!                                   |
| Manual Review | Thanks for submitting your application, we’ll be in touch shortly. |
| Denied        | Sorry, your application was not successful.                        |
