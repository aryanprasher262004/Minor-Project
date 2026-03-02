
// handeles the chat requests and helps in enabling the chatbot to respond to the user queries.
import { ChatRequest, ChatResponse } from "@/types/chat";
import { processChat } from "./chat.service"; 

export async function handleChat(
    data: ChatRequest): Promise<ChatResponse> 
    {
        return {
            reply: `You said ${data.message}`,
            intent: "mock_intent",
            confidence: 1,
        };
    }