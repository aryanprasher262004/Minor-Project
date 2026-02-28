// app/api/chat/route.ts

import { NextResponse } from "next/server";
import { ChatRequest, ChatResponse } from "@/types/chat";

// Temporary mock response (we connect real logic next)
export async function POST(req: Request) {
  try {
    const body: ChatRequest = await req.json();

    if (!body.message) {
      return NextResponse.json(
        { error: true, message: "Message is required" },
        { status: 400 }
      );
    }

    // TEMP response (Step 1 validation)
    const response: ChatResponse = {
      reply: `You said: ${body.message}`,
      intent: "mock_intent",
      confidence: 1.0,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Server error" },
      { status: 500 }
    );
  }
}