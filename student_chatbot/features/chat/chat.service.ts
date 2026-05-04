import { ChatRequest, ChatResponse } from "@/types/chat";
import { addMessage, getSessionHistory } from "@/lib/memory.store";
import { saveMessage } from "@/db/db.client";
import { callDialogflow } from "@/nlp/dialogflow.client";
import { buildResponse } from "./handlers/response.builder";

export async function processChat(
  data: ChatRequest
): Promise<ChatResponse> {

  const history = getSessionHistory(data.sessionId);

  const lastUserMessage = history
    .filter(msg => msg.role === "user")
    .slice(-1)[0]?.message;

  // Integrate Dialogflow
  let intentName = "default";
  let answer = "";
  let confidence = 1.0;

  try {
    const dialogflowResult = await callDialogflow(data.message, data.sessionId);
    intentName = dialogflowResult?.intent?.displayName || "default";
    confidence = dialogflowResult?.intentDetectionConfidence || 1.0;
    
    if (dialogflowResult?.fulfillmentText) {
      answer = dialogflowResult.fulfillmentText;
    }
  } catch (error) {
    console.error("Dialogflow Error:", error);
    // Fallback intent logic
    intentName = "default";
  }

  // Fallback to local knowledge base if Dialogflow didn't provide a specific answer 
  // or if it's just a default fallback response.
  if (!answer || intentName === "Default Fallback Intent") {
    answer = buildResponse(intentName);
  }

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
    intent: intentName,
    confidence: confidence,
  };
}
