// migrate_to_dialogflow.mjs
import dialogflow from '@google-cloud/dialogflow';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env.local') });

console.log("Checking environment variables...");
console.log("PROJECT_ID:", process.env.DIALOGFLOW_PROJECT_ID ? "Found" : "Missing");
console.log("CLIENT_EMAIL:", process.env.DIALOGFLOW_CLIENT_EMAIL ? "Found" : "Missing");
console.log("PRIVATE_KEY:", process.env.DIALOGFLOW_PRIVATE_KEY ? "Found" : "Missing");

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const credentials = {
  client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  private_key: process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!projectId || !credentials.client_email || !credentials.private_key) {
  console.error("Missing Dialogflow credentials!");
  process.exit(1);
}

const intentsClient = new dialogflow.IntentsClient({ projectId, credentials });

const intentsToCreate = [
  "greeting_query", 
  "library_query", 
  "contact_query", 
  "placement_query",
  "fees_query",
  "exam_query",
  "admission_query",
  "hostel_query"
];

// Group utterances by intent
const utterances = [
  { text: "hi", intent: "greeting_query" },
  { text: "hello", intent: "greeting_query" },
  { text: "hey there", intent: "greeting_query" },
  { text: "good morning", intent: "greeting_query" },
  { text: "good afternoon", intent: "greeting_query" },
  { text: "good evening", intent: "greeting_query" },
  { text: "hi bot", intent: "greeting_query" },
  { text: "hey chatbot", intent: "greeting_query" },
  { text: "how are you?", intent: "greeting_query" },
  { text: "what's up", intent: "greeting_query" },
  { text: "greetings", intent: "greeting_query" },
  { text: "hello there", intent: "greeting_query" },
  { text: "anyone there?", intent: "greeting_query" },
  { text: "hi how can you help me", intent: "greeting_query" },
  { text: "hi I need some help", intent: "greeting_query" },

  { text: "fees", intent: "fees_query" },
  { text: "what is the semester fee?", intent: "fees_query" },
  { text: "how much do I pay for college?", intent: "fees_query" },
  { text: "fee structure", intent: "fees_query" },
  { text: "how much is the tuition?", intent: "fees_query" },
  { text: "tell me about the payment details", intent: "fees_query" },
  { text: "what does the course cost?", intent: "fees_query" },
  { text: "when do we pay the fees?", intent: "fees_query" },
  { text: "cost of the btech program", intent: "fees_query" },
  { text: "is there a fee waiver?", intent: "fees_query" },
  { text: "how to pay my fees?", intent: "fees_query" },
  { text: "what is the price of the degree?", intent: "fees_query" },
  { text: "tuition fee details", intent: "fees_query" },
  { text: "how expensive is the college?", intent: "fees_query" },
  { text: "are there any hidden charges?", intent: "fees_query" },
  { text: "fee payment deadline", intent: "fees_query" },
  { text: "how much is the annual fee?", intent: "fees_query" },

  { text: "when are exams starting?", intent: "exam_query" },
  { text: "what is the exam schedule?", intent: "exam_query" },
  { text: "exam dates", intent: "exam_query" },
  { text: "when is the midterm?", intent: "exam_query" },
  { text: "are finals next week?", intent: "exam_query" },
  { text: "where can I find the exam timetable?", intent: "exam_query" },
  { text: "will the exams be online?", intent: "exam_query" },
  { text: "what syllabus is coming for the exam?", intent: "exam_query" },
  { text: "exam date sheet", intent: "exam_query" },
  { text: "when do we get exam results?", intent: "exam_query" },
  { text: "how long are the exams?", intent: "exam_query" },
  { text: "passing marks for exams", intent: "exam_query" },
  { text: "are exams postponed?", intent: "exam_query" },
  { text: "what happens if I fail an exam?", intent: "exam_query" },
  { text: "is there a retest?", intent: "exam_query" },
  { text: "how to prepare for finals?", intent: "exam_query" },

  { text: "how to apply for admission?", intent: "admission_query" },
  { text: "when does admission start?", intent: "admission_query" },
  { text: "what are the admission requirements?", intent: "admission_query" },
  { text: "eligibility criteria for admission", intent: "admission_query" },
  { text: "is the admission open?", intent: "admission_query" },
  { text: "how to get admission in this college?", intent: "admission_query" },
  { text: "admission last date", intent: "admission_query" },
  { text: "documents required for admission", intent: "admission_query" },
  { text: "can I get direct admission?", intent: "admission_query" },
  { text: "what is the admission process?", intent: "admission_query" },
  { text: "do you have management quota?", intent: "admission_query" },
  { text: "admission form download", intent: "admission_query" },
  { text: "can foreign students apply?", intent: "admission_query" },
  { text: "what is the cutoff percentage?", intent: "admission_query" },
  { text: "entrance exam for admission", intent: "admission_query" },
  { text: "do you accept SAT scores?", intent: "admission_query" },

  { text: "is there an en suite hostel?", intent: "hostel_query" },
  { text: "tell me about hostel facilities", intent: "hostel_query" },
  { text: "how to apply for hostel?", intent: "hostel_query" },
  { text: "are hostels available for girls?", intent: "hostel_query" },
  { text: "hostel timings", intent: "hostel_query" },
  { text: "is food provided in the hostel?", intent: "hostel_query" },
  { text: "can I get a single room in hostel?", intent: "hostel_query" },
  { text: "what is the hostel fee?", intent: "hostel_query" },
  { text: "where is the boys hostel located?", intent: "hostel_query" },
  { text: "hostel rules and regulations", intent: "hostel_query" },
  { text: "do hostels have wifi?", intent: "hostel_query" },
  { text: "hostel room allocation", intent: "hostel_query" },
  { text: "how many students per room?", intent: "hostel_query" },
  { text: "is laundry included in hostel?", intent: "hostel_query" },
  { text: "hostel curfew time", intent: "hostel_query" },

  { text: "where is the library?", intent: "library_query" },
  { text: "library timings", intent: "library_query" },
  { text: "how to borrow books?", intent: "library_query" },
  { text: "can I study in the library?", intent: "library_query" },
  { text: "library late fee", intent: "library_query" },
  { text: "online library access", intent: "library_query" },
  { text: "reading room timings", intent: "library_query" },
  { text: "how many books can I issue?", intent: "library_query" },
  { text: "do you have a digital library?", intent: "library_query" },
  { text: "where to find research papers?", intent: "library_query" },
  { text: "request a new book", intent: "library_query" },
  { text: "library opening hours", intent: "library_query" },
  { text: "is the library open on weekends?", intent: "library_query" },
  { text: "do I need a physical library card?", intent: "library_query" },

  { text: "how to contact administration?", intent: "contact_query" },
  { text: "what is the college phone number?", intent: "contact_query" },
  { text: "email ID for support", intent: "contact_query" },
  { text: "where is the admin block?", intent: "contact_query" },
  { text: "contact details of principal", intent: "contact_query" },
  { text: "who to call for emergency?", intent: "contact_query" },
  { text: "how to reach the campus?", intent: "contact_query" },
  { text: "IT support contact", intent: "contact_query" },
  { text: "who should I contact for fees issue?", intent: "contact_query" },
  { text: "helpline number", intent: "contact_query" },
  { text: "college location address", intent: "contact_query" },
  { text: "how to book an appointment with dean?", intent: "contact_query" },
  { text: "student affairs office email", intent: "contact_query" },
  { text: "contact us page", intent: "contact_query" },

  { text: "how are the placements?", intent: "placement_query" },
  { text: "highest package offered", intent: "placement_query" },
  { text: "average salary?", intent: "placement_query" },
  { text: "which companies visit for placement?", intent: "placement_query" },
  { text: "is there a placement cell?", intent: "placement_query" },
  { text: "how to apply for internships?", intent: "placement_query" },
  { text: "do you offer 100% placement?", intent: "placement_query" },
  { text: "campus recruitment process", intent: "placement_query" },
  { text: "top recruiters", intent: "placement_query" },
  { text: "placement statistics", intent: "placement_query" },
  { text: "how to prepare for interviews?", intent: "placement_query" },
  { text: "where is the placement office?", intent: "placement_query" },
  { text: "can alumni help with jobs?", intent: "placement_query" },
  { text: "summer internship companies", intent: "placement_query" },
];

const knowledgeBase = {
  greeting_query: "Hello! I am your student bot. I can help you with queries about fees, exams, admissions, hostel, library, placement, and contacts. How can I assist you today?",
  library_query: "The library is open from 8:00 AM to 7:00 PM on weekdays, and 9:00 AM to 5:00 PM on weekends. You can borrow up to 2 books using your student ID.",
  contact_query: "You can contact the main administration at admin@college.edu or call the helpline at +1-800-COLLEGE. For IT support, email ithelp@college.edu.",
  placement_query: "Our college has a dedicated placement cell. Last year we had a 95% placement rate with top recruiters including tech giants. Internships also start in the 6th semester.",
  fees_query: "The tuition fee per semester is $2,000. For detailed breakdown including library and lab fees, please visit the student portal.",
  exam_query: "Final exams are scheduled for the last week of May. The detailed date sheet will be published on the university website two weeks prior.",
  admission_query: "Admissions for the Fall semester are open until August 15th. You can apply online through our official admission portal with your prior academic transcripts.",
  hostel_query: "We offer both AC and non-AC hostel accommodations on campus. The hostel fee is $800 per semester. Applications must be submitted through the accommodation office.",
  fallback: "I'm sorry, I didn't quite understand that. Could you please rephrase your question? I can help you with fees, exams, admissions, and hostel queries!"
};

async function migrate() {
  const agentPath = intentsClient.projectAgentPath(projectId);

  // Fetch existing intents to safely update them
  const [existingIntents] = await intentsClient.listIntents({ parent: agentPath });
  const existingMap = new Map(existingIntents.map(i => [i.displayName, i]));

  for (const intentName of intentsToCreate) {
    console.log(`Processing intent: ${intentName}`);

    const newMessages = [{ text: { text: [knowledgeBase[intentName] || `Intent matched: ${intentName}`] } }];
    const existingIntent = existingMap.get(intentName);

    if (existingIntent) {
      console.log(`Intent ${intentName} already exists, updating its messages and resetting training phrases...`);
      
      const trainingPhrases = utterances
        .filter(u => u.intent === intentName)
        .map(u => ({
          type: 'EXAMPLE',
          parts: [{ text: u.text }],
        }));
        
      existingIntent.trainingPhrases = trainingPhrases;
      existingIntent.messages = newMessages;
      
      try {
        await intentsClient.updateIntent({
          intent: existingIntent,
          languageCode: 'en',
          intentView: 'INTENT_VIEW_FULL',
        });
        console.log(`Intent updated: ${existingIntent.displayName}`);
      } catch (err) {
        console.error(`Error updating intent ${intentName}:`, err);
      }
    } else {
      const trainingPhrases = utterances
        .filter(u => u.intent === intentName)
        .map(u => ({
          type: 'EXAMPLE',
          parts: [{ text: u.text }],
        }));

      const intent = {
        displayName: intentName,
        trainingPhrases: trainingPhrases,
        messages: newMessages,
      };

      try {
        const [response] = await intentsClient.createIntent({
          parent: agentPath,
          intent: intent,
        });
        console.log(`Intent created: ${response.name}`);
      } catch (err) {
        console.error(`Error creating intent ${intentName}:`, err);
      }
    }
  }

  console.log("Migration complete!");
}

migrate();
