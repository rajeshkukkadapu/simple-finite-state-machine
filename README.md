# Simple Finite State Machine (FSM) in Node.js

A recreated internship project demonstrating a turnstile FSM with `LOCKED` and `UNLOCKED` states.

## Features
- State transition rules for `COIN` and `PUSH`
- Node.js and Express REST API
- Interactive HTML/CSS/JavaScript interface
- Activity history and reset
- Netlify Function API configuration for deployment

## Run locally
1. Install Node.js from https://nodejs.org/
2. Open a terminal in this project folder.
3. Run `npm install`
4. Run `npm start`
5. Open http://localhost:3000

## Deploy to Netlify
This project includes `netlify.toml` and `netlify/functions/fsm.js`.
1. Upload the project to a GitHub repository.
2. In Netlify, choose **Add new project / Import an existing project**.
3. Connect the repository.
4. Set the publish directory to `public` if Netlify does not detect it automatically.
5. Deploy.

The frontend calls `/api/fsm`; the Netlify redirect routes that path to the serverless function.
For local use, the Express server in `server.js` provides the same API.

Note: This is a recreated implementation based on the project title on the certificate, not recovered original coursework.


Live Demo

"Click here to view the Simple Finite State Machine project" (https://6ae58d1da44f4c0f83235124--nimble-hummingbird-d0e511.netlify.app)

Project Description

The Simple Finite State Machine (FSM) is a Node.js-based project that demonstrates how a turnstile changes states in response to events.

Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Netlify Functions

Features

- Displays the current machine state.
- Simulates coin insertion.
- Simulates pushing the turnstile.
- Provides a reset function.
- Demonstrates state transitions.
