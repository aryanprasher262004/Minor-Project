// nlp/dialogflow.client.ts
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

/**
 * Dialogflow client configuration and session management.
 * Note: Requires GOOGLE_APPLICATION_CREDENTIALS environment variable or 
 * explicit credentials in the session client constructor.
 */

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const credentials = {
  client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  private_key: process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!projectId || !credentials.client_email || !credentials.private_key) {
  console.warn("Dialogflow credentials not fully provided. Chat may fail.");
}

const sessionClient = new dialogflow.SessionsClient({
  projectId,
  credentials,
});

/**
 * Sends a text query to Dialogflow and returns the detection result.
 * @param message The user's message.
 * @param sessionId A unique session ID (e.g., uuid).
 */
export async function callDialogflow(message: string, sessionId: string = uuidv4()) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId!, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
}
