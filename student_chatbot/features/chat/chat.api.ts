import { ChatRequest , APIResponse, ChatResponseData } from "./chat.types";

export async function sendMessage(payload: ChatRequest

): Promise<APIResponse<ChatResponseData>> {
    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error sending message:", error);
        return {
            success: false,
            data: null,
            error: "Failed to send message",
        };
    }
}