
// these are the types of chats that will happen during the working of the chatbot 
// only these types will be used in the working of the chatbot 


export interface ChatRequest {
    message: string;
    userId: string;
    sessionId: string;

}


export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatResponseData {
  message: ChatMessage;
  intent: string;
  confidence: number;
}

export interface APIResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}