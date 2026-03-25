"use client";

import { useEffect, useState } from "react";
import { sendMessage } from "@/features/chat/chat.api";

export default function ChatPage() {
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Session setup
  useEffect(() => {
    let storedSession = localStorage.getItem("sessionId");

    if (!storedSession) {
      storedSession = crypto.randomUUID();
      localStorage.setItem("sessionId", storedSession);
    }

    setSessionId(storedSession);
  }, []);

  // ✅ Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await sendMessage({
      message: input,
      sessionId,
      userId: "user1",
    });

    if (response.success && response.data) {
      setMessages((prev) => [
        ...prev,
        response.data!.message,
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.error || "Something went wrong",
          timestamp: Date.now(),
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Student Chatbot</h1>

      {/* Messages */}
      <div className="border p-4 h-96 overflow-y-auto mb-4 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block px-3 py-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}

        {loading && <p className="text-gray-500">Typing...</p>}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          className="border flex-1 p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}