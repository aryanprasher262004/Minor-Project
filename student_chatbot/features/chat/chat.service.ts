  
import { ChatRequest,ChatResponse
 } from "@/types/chat";

 export async function processChat(
    data: ChatRequest):
     Promise<ChatResponse> {
        const reply = ` Your service is processed ${data.message} `;
    return {
        reply,
        intent: "mock_intent",
        confidence: 1,
    };
 }