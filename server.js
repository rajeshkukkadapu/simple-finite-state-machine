const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function transition(state, input) {
  const transitions = {
    LOCKED: { COIN: "UNLOCKED", PUSH: "LOCKED" },
    UNLOCKED: { COIN: "UNLOCKED", PUSH: "LOCKED" }
  };
  if (!transitions[state] || !transitions[state][input]) {
    throw new Error("Invalid state or input.");
  }
  return transitions[state][input];
}

// Each browser session can keep its own state in the frontend.
// This API accepts a state and input and returns the next state.
app.post("/api/fsm", (req, res) => {
  const state = String(req.body.state || "LOCKED").toUpperCase();
  const input = String(req.body.input || "").toUpperCase();

  try {
    const nextState = transition(state, input);
    res.json({
      previousState: state,
      input,
      currentState: nextState,
      message: `${state} + ${input} → ${nextState}`
    });
  } catch (error) {
    res.status(400).json({ error: "Use state LOCKED or UNLOCKED and input COIN or PUSH." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", project: "Simple Finite State Machine (FSM) in Node.js" });
});

app.listen(PORT, () => {
  console.log(`FSM app running at http://localhost:${PORT}`);
});
