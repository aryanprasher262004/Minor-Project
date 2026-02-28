// this is the types of chats that will happen during the working of the chatbot .


// Request sent to the chatbot API
export interface ChatRequest {
    message: string;
    userId: string;
    sessionId: string;
    
}
// Response from the chatbot API
export interface ChatResponse {
    reply: string;
    intent: string;
    confidence: number;
    
    
}

// Result from the NLP engine
export interface NLPResult {
    intent: string;
    entities: Record<string, any>;
    confidence: number;


    
}

// Error response from the NLP engine
export interface APIError {
    error: true;
    message: string;
    
}