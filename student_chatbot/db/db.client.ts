// db/db.client.ts

type DBMessage = {
  sessionId: string;
  role: "user" | "bot";
  message: string;
  timestamp: number;
};

// TEMP in-memory DB (will replace with Convex later)
const database: DBMessage[] = [];

export function saveMessage(data: DBMessage) {
  database.push(data);
  console.log("Saved to DB:", data);
}

export function getMessages(sessionId: string) {
  return database.filter(msg => msg.sessionId === sessionId);
}