// nlp/wit.client.ts

import { NLPResult } from "../types/chat";

const WIT_API_URL = "https://api.wit.ai/message";

export async function detectIntent(message: string): Promise<NLPResult> {
    const response = await fetch(
        `${WIT_API_URL}?q=${encodeURIComponent(message)}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.WIT_ACCESS_TOKEN}`,
            },
        }
    );

    const data = await response.json();

    const intent = data.intents?.[0]?.name || "unknown";
    const confidence = data.intents?.[0]?.confidence || 0;

    return {
        intent,
        entities: data.entities || {},
        confidence,
    };
}
// eg