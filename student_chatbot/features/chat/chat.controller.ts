

import { ChatRequest, ChatResponse } from "@/types/chat";

export async function handleChat(
    data: ChatRequest): Promise<ChatResponse> 
    {
        return {
            reply: `You said ${data.message}`,
            intent: "mock_intent",
            confidence: 1,
        };
    }