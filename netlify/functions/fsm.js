// Netlify Function API for the FSM. No Express dependency is required here.
exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "ok", project: "Simple Finite State Machine (FSM) in Node.js" })
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const state = String(body.state || "LOCKED").toUpperCase();
  const input = String(body.input || "").toUpperCase();
  const transitions = {
    LOCKED: { COIN: "UNLOCKED", PUSH: "LOCKED" },
    UNLOCKED: { COIN: "UNLOCKED", PUSH: "LOCKED" }
  };

  if (!transitions[state] || !transitions[state][input]) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Use state LOCKED or UNLOCKED and input COIN or PUSH." })
    };
  }

  const currentState = transitions[state][input];
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      previousState: state,
      input,
      currentState,
      message: `${state} + ${input} → ${currentState}`
    })
  };
};
