import { getAnswer } from "@/knowledge/knowledge.service";

export function buildResponse(intent: string): string {
  return getAnswer(intent);
}

// builds the response when user sends a request 