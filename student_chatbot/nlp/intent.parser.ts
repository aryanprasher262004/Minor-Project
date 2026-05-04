import { NLPResult } from "@/types/chat";

/**
 * Normalizes raw Dialogflow responses into our standard NLPResult contract.
 * Extracting the top intent, extracting the highest confidence, and aggregating entities.
 *
 * @param queryResult The `queryResult` object returned from Dialogflow's `detectIntent`.
 * @returns An NLPResult object.
 */
export function parseDialogflowResponse(queryResult: any): NLPResult {
  let intentName = "unknown";
  let confidence = 0;

  if (queryResult && queryResult.intent) {
    // Dialogflow already provides the best matching intent
    intentName = queryResult.intent.displayName;
    confidence = queryResult.intentDetectionConfidence || 0;
  }

  // Parameters (entities) in Dialogflow
  let entities: Record<string, any> = {};
  if (queryResult && queryResult.parameters && queryResult.parameters.fields) {
    // Convert protobuf struct to regular object if needed
    // For now we just return the fields object
    entities = queryResult.parameters.fields;
  }

  return {
    intent: intentName,
    confidence: confidence,
    entities: entities,
    fulfillmentText: queryResult?.fulfillmentText,
  };
}
