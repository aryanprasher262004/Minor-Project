import { ChatRequest, ChatResponse } from "@/types/chat";
import { getAnswer } from "@/knowledge/knowledge.service";
import { addMessage, getSessionHistory } from "@/lib/memory.store";
import { saveMessage } from "@/db/db.client";

export async function processChat(
  data: ChatRequest
): Promise<ChatResponse> {

  // 1. Get history BEFORE adding new message
  const history = getSessionHistory(data.sessionId);

  // 2. Get last user message (previous context)
  const lastUserMessage = history
    .filter(msg => msg.role === "user")
    .slice(-1)[0]?.message;

  // 3. Context-aware intent logic (TEMP without NLP)
  let mockIntent = "default";

  if (data.message.toLowerCase().includes("placement")) {
    mockIntent = "placement_query";
  } 
  else if (
    data.message.toLowerCase().includes("package") &&
    lastUserMessage?.toLowerCase().includes("placement")
  ) {
    mockIntent = "placement_query";
  }

  // 4. Store current user message
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

  // 5. Get answer
  const answer = getAnswer(mockIntent);

  // 6. Store bot response
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

  // 7. Debug history
  console.log("Chat History:", getSessionHistory(data.sessionId));

  return {
    reply: answer,
    intent: mockIntent,
    confidence: 1.0,
  };
}
// 
//