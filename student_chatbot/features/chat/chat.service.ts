import { ChatRequest, ChatResponse } from "@/types/chat";
import { addMessage, getSessionHistory } from "@/lib/memory.store";
import { saveMessage } from "@/db/db.client";

import { resolveIntent } from "./handlers/intent.handler";
import { buildResponse } from "./handlers/response.builder";

export async function processChat(
  data: ChatRequest
): Promise<ChatResponse> {

  const history = getSessionHistory(data.sessionId);

  const lastUserMessage = history
    .filter(msg => msg.role === "user")
    .slice(-1)[0]?.message;

  // 🔥 Intent logic separated
  const intent = resolveIntent(data.message, lastUserMessage);

  // Store user message
  addMessage(data.sessionId, {
    role: "user",
    message: data.message,
  });

  saveMessage({
    sessionId: data.sessionId,
    role: "user",
    message: data.message,
    timestamp: Date.now(),
  });

  // 🔥 Response logic separated
  const answer = buildResponse(intent);

  // Store bot response
  addMessage(data.sessionId, {
    role: "bot",
    message: answer,
  });

  saveMessage({
    sessionId: data.sessionId,
    role: "bot",
    message: answer,
    timestamp: Date.now(),
  });

  return {
    reply: answer,
    intent,
    confidence: 1.0,
  };
}