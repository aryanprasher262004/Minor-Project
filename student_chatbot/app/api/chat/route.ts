import { NextResponse } from "next/server";
import { handleChat } from "@/features/chat/chat.controller";
import { ChatRequest } from "@/types/chat";
import { createSuccessResponse, createErrorResponse } from "@/lib/apiResponse";

export async function POST(req: Request) {
  try {
    const body: ChatRequest = await req.json();

    if (!body.message) {
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
    return NextResponse.json(response);

  } catch (error) {
    return NextResponse.json(
      createErrorResponse("Server error"),
      { status: 500 }
    );
  }
}