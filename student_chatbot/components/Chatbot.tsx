"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { sendMessage } from "@/features/chat/chat.api";

type Message = { id: string; role: "user" | "bot"; content: string };

const FAQs = [
  "How to apply for 2026?",
  "What is the fee for B.Tech?",
  "Tell me about Placements",
  "Admission eligibility?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialMessage: Message = { 
    id: "init", 
    role: "bot", 
    content: "Hi there! 👋 I'm the SEPU virtual assistant. How can I help you today?" 
  };

  useEffect(() => {
    let sid = localStorage.getItem("sepu_chat_session");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("sepu_chat_session", sid);
    }
    setSessionId(sid);
    
    const savedMessages = localStorage.getItem("sepu_chat_active");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messages.length > 0) {
      localStorage.setItem("sepu_chat_active", JSON.stringify(messages));
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const userMsg = textOverride || input.trim();
    if (!userMsg || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: userMsg }]);
    setIsLoading(true);

    // Auto-focus back to input
    setTimeout(() => inputRef.current?.focus(), 50);

    try {
      const response = await sendMessage({ message: userMsg, sessionId, userId: sessionId });
const botReply = response?.data?.message?.content || response?.error || "I'm not sure how to answer that right now.";      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleClearChat = () => {
    // Save to history before clearing
    const history = JSON.parse(localStorage.getItem("sepu_chat_history") || "[]");
    history.push({ date: new Date().toISOString(), session: messages });
    localStorage.setItem("sepu_chat_history", JSON.stringify(history));
    
    // Reset
    setMessages([initialMessage]);
    localStorage.setItem("sepu_chat_active", JSON.stringify([initialMessage]));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-[380px] sm:w-[450px] h-[600px] sm:h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-slate-200 transition-all duration-300">
          
          {/* Header */}
          <div className="bg-[#2e1065] text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[#2e1065] text-xs">
                SEPU
              </div>
              <h3 className="font-semibold text-lg">SEPU Assistant</h3>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleClearChat} title="Clear Chat" className="text-white/70 hover:text-white text-sm flex items-center gap-1">
                🗑️ <span className="text-xs">Clear</span>
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-xl ml-2">
                ✕
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-br-sm" 
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-bl-sm px-4 py-3 text-sm shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies (FAQs) */}
          <div className="bg-slate-50 px-3 py-2 border-t border-slate-200 flex overflow-x-auto gap-2 scrollbar-hide">
            {FAQs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(faq)}
                disabled={isLoading}
                className="whitespace-nowrap bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-full text-xs font-medium transition-colors disabled:opacity-50 shadow-sm"
              >
                {faq}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Write a message..."
              className="flex-1 bg-slate-100 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-[15px] outline-none transition-all text-slate-800"
              disabled={isLoading}
              autoFocus
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 text-white rounded-xl w-12 h-12 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="bg-[#2e1065] hover:bg-[#4c1d95] text-white px-6 py-4 rounded-full shadow-2xl font-semibold flex items-center gap-3 transition-transform transform hover:scale-105"
      >
        {isOpen ? "✕ Close" : "💬 Ask SEPU"}
      </button>
    </div>
  );
}