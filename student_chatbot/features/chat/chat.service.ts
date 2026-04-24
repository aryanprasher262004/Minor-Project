import { ChatRequest, ChatResponse } from "@/types/chat";
import { addMessage, getSessionHistory } from "@/lib/memory.store";
import { saveMessage } from "@/db/db.client";

import { callDialogflow } from "@/nlp/dialogflow.client";

export async function processChat(
  data: ChatRequest
): Promise<ChatResponse> {

  const history = getSessionHistory(data.sessionId);

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

  // Fetch response from Dialogflow
  let answer = "I'm sorry, I didn't quite cover that or there was an error connecting to the backend.";
  let intent = "unknown_intent";
  let confidence = 0;

  try {
    const dialogflowResult = await callDialogflow(data.message, data.sessionId);
    if (dialogflowResult) {
      intent = dialogflowResult.intent?.displayName || 'unknown_intent';
      answer = dialogflowResult.fulfillmentText || answer;
      confidence = dialogflowResult.intentDetectionConfidence || 0;
    }
  } catch (error) {
    console.error("Dialogflow Error:", error);
  }

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
    confidence,
  };
}
