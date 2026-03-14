import { ChatRequest, ChatResponse } from "@/types/chat";
import { detectIntent } from "@/nlp/wit.client";

export async function processChat(
  data: ChatRequest
): Promise<ChatResponse> {

  const nlpResult = await detectIntent(data.message);

  return {
    reply: `Detected intent: ${nlpResult.intent}`,
    intent: nlpResult.intent,
    confidence: nlpResult.confidence,
  };
}