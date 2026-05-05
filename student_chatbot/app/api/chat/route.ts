import { NextResponse } from "next/server";
import { handleChat } from "@/features/chat/chat.controller";
import { ChatRequest } from "@/types/chat";
import { createSuccessResponse, createErrorResponse } from "@/lib/apiResponse";
import { logtail } from "@/lib/logtail";

export async function POST(req: Request) {

  // ✅ Log when request is received
  logtail.info("Chat request received", {
    timestamp: new Date().toISOString(),
  });

  try {
    const body: ChatRequest = await req.json();

    if (!body.message) {
      await logtail.flush(); // ✅ flush before early return
      return NextResponse.json(
        createErrorResponse("Message is required"),
        { status: 400 }
      );
    }

    const result = await handleChat(body);

    const response = createSuccessResponse({
      message: {
        role: "assistant",
        content: result.reply,
        timestamp: Date.now(),
      },
      intent: result.intent,
      confidence: result.confidence,
    });

    console.log("FINAL API RESPONSE:", JSON.stringify(response, null, 2));

    await logtail.flush();

    return NextResponse.json(response);

  } catch (error) {

    logtail.error("Chat API error", {
      error: String(error),
      timestamp: new Date().toISOString(),
    });

    await logtail.flush();

    return NextResponse.json(
      createErrorResponse("Server error"),
      { status: 500 }
    );
  }
}