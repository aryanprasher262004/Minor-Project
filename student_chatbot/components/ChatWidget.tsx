"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi there! I'm your student assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId: "web-session", userId: "web-user" }),
      });
      const data = await res.json();
      
      if (data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);
      } else {
        setMessages((prev) => [...prev, { text: "Oops, I'm having trouble connecting to my brain. Please try again later.", isBot: true }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { text: "Oops, an error occurred while connecting. Please check your connection.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-2xl w-80 sm:w-96 overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold text-sm">Student Assistant Bot</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="h-96 p-4 overflow-y-auto bg-gray-50 dark:bg-zinc-950 flex flex-col gap-3" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${msg.isBot ? "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-zinc-700" : "bg-blue-600 text-white rounded-tr-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center gap-2 text-gray-500">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                  <span className="text-xs">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about admissions, fees..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-gray-100 dark:bg-zinc-800 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              >
                <Send size={18} className="translate-x-[1px]" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform duration-300 shadow-xl text-white rounded-full p-4 flex items-center justify-center group"
          aria-label="Open chat widget"
        >
          <MessageCircle size={30} className="group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
}
