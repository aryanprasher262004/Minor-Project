import { ChatRequest, ChatResponse } from "@/types/chat";
import { getAnswer } from "@/knowledge/knowledge.service";
import { addMessage , getSessionHistory } from "@/lib/memory.store";

export async function processChat(
  data: ChatRequest
): Promise<ChatResponse> {

  // 🔴 TEMP MOCK data for testing
  const mockIntent = "placement_query";

  // store user message 
  addMessage(data.sessionId, {
    role: "user",
    message: data.message,
  });

  // get answer 
  

  const answer = getAnswer(mockIntent);

  // store bot response
  addMessage(data.sessionId, {
    role: "bot",
    message: answer,
  });

  // history for context of previous question 
  const history = getSessionHistory(data.sessionId);
  console.log("Chat History ", history)

  return {
    reply: answer,
    intent: mockIntent,
    confidence: 1.0,
  };
}