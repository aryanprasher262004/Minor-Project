// lib/memory.store.ts

type Message = {
  role: "user" | "bot";
  message: string;
};

const memory: Record<string, Message[]> = {};

export function addMessage(
  sessionId: string,
  message: Message
) {
  if (!memory[sessionId]) {
    memory[sessionId] = [];
  }

  memory[sessionId].push(message);
}

export function getSessionHistory(sessionId: string): Message[] {
  return memory[sessionId] || [];
}


// sessionId → messages[]

// store the messages in the memory

/* {
  "abc123": [
  { role: "user", message: "What is fee?" },
    { role: "bot", message: "₹50,000" }
  ]
 }*/