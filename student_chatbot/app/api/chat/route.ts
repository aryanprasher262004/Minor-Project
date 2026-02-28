import { NextResponse } from "next/server";
import { ChatRequest,ChatResponse } from "@/types/chat";

export async function POST(req: Request) {
    try{
        const body: ChatRequest = await req.json();
        
        if (!body.message){
            return NextResponse.json(
                {error:true, message:"Message is required"},
                {status:400}
            );
        }
        const response: ChatResponse = {
            reply:`You said ${body.message}`,
            intent:"mock_intent",
            confidence:1.0,
        }
        return NextResponse.json(response);
    }
    catch(error){
        console.error("Error in chat API:", error);
        return NextResponse.json(
            {error:true, message:"Internal server error"},
            {status:500}
        );
    }
}
