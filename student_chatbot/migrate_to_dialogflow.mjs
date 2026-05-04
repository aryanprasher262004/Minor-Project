// migrate_to_dialogflow.mjs
import dialogflow from '@google-cloud/dialogflow';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

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

// =======================
// INTENTS
// =======================

const intentsToCreate = [
  "greeting_query",
  "library_query",
  "contact_query",
  "placement_query",
  "fees_query",
  "exam_query",
  "admission_query",
  "hostel_query",

  // ADVANCED
  "scholarship_query",
  "attendance_query",
  "course_structure_query",
  "internship_query",
  "transport_query",
  "faculty_query",
  "results_query",
  "re_evaluation_query",
  "drop_course_query",
  "campus_facility_query"
];


// =======================
// UTTERANCES
// =======================

const utterances = [

  // GREETING
  { text: "hi", intent: "greeting_query" },
  { text: "hello", intent: "greeting_query" },
  { text: "hey there", intent: "greeting_query" },
  { text: "good morning", intent: "greeting_query" },
  { text: "how are you?", intent: "greeting_query" },

  // FEES
  { text: "what is the semester fee?", intent: "fees_query" },
  { text: "fee structure", intent: "fees_query" },
  { text: "how to pay my fees?", intent: "fees_query" },

  // EXAMS
  { text: "when are exams?", intent: "exam_query" },
  { text: "exam schedule", intent: "exam_query" },

  // ADMISSION
  { text: "how to apply for admission?", intent: "admission_query" },
  { text: "admission last date", intent: "admission_query" },

  // HOSTEL
  { text: "hostel facilities", intent: "hostel_query" },
  { text: "hostel fee", intent: "hostel_query" },

  // LIBRARY
  { text: "library timings", intent: "library_query" },
  { text: "borrow books", intent: "library_query" },

  // CONTACT
  { text: "contact details", intent: "contact_query" },

  // PLACEMENT
  { text: "placement stats", intent: "placement_query" },
  { text: "average package", intent: "placement_query" },

  // =======================
  // ADVANCED UTTERANCES
  // =======================

  // SCHOLARSHIP
  { text: "are there scholarships?", intent: "scholarship_query" },
  { text: "financial aid options", intent: "scholarship_query" },

  // ATTENDANCE
  { text: "attendance requirement", intent: "attendance_query" },
  { text: "minimum attendance", intent: "attendance_query" },

  // COURSE STRUCTURE
  { text: "course curriculum", intent: "course_structure_query" },
  { text: "subjects in first year", intent: "course_structure_query" },

  // INTERNSHIP
  { text: "internship details", intent: "internship_query" },
  { text: "when do internships start?", intent: "internship_query" },

  // TRANSPORT
  { text: "bus facility", intent: "transport_query" },
  { text: "transport routes", intent: "transport_query" },

  // FACULTY
  { text: "faculty details", intent: "faculty_query" },
  { text: "are professors experienced?", intent: "faculty_query" },

  // RESULTS
  { text: "check results", intent: "results_query" },
  { text: "result date", intent: "results_query" },

  // RE-EVALUATION
  { text: "re-evaluation process", intent: "re_evaluation_query" },

  // DROP COURSE
  { text: "drop subject", intent: "drop_course_query" },

  // CAMPUS
  { text: "campus facilities", intent: "campus_facility_query" }
];


// =======================
// KNOWLEDGE BASE
// =======================

const knowledgeBase = {

  greeting_query:
    "Hello! I can help you with queries about fees, exams, admissions, hostel, placements, and more.",

  library_query:
    "The library is open from 8 AM to 7 PM on weekdays and provides access to physical and digital resources.",

  contact_query:
    "You can contact the administration via official email or helpline available on the student portal.",

  placement_query:
    "The university has a strong placement support system with top recruiters and internship opportunities starting from mid-program.",

  fees_query:
    "The tuition fee varies by program and semester. Students can check detailed fee structure on the student portal.",

  exam_query:
    "Exams are conducted at the end of each semester. The detailed schedule is released before exams.",

  admission_query:
    "Admissions are conducted online. Students must meet eligibility criteria and submit required documents.",

  hostel_query:
    "Hostel facilities include accommodation, food, and basic amenities. Fees vary based on room type.",

  // =======================
  // ADVANCED KNOWLEDGE
  // =======================

  scholarship_query:
    "Merit-based and need-based scholarships are available. Students can apply through the scholarship section on the portal.",

  attendance_query:
    "Students must maintain at least 75% attendance to be eligible for exams.",

  course_structure_query:
    "The program follows a semester system with core subjects initially and electives in later years.",

  internship_query:
    "Internships usually start from the 5th or 6th semester with support from the placement cell.",

  transport_query:
    "Transport services are available with multiple routes. Students can register at the start of the semester.",

  faculty_query:
    "Faculty members have strong academic and industry experience and are accessible for academic support.",

  results_query:
    "Results are published on the student portal. Students can log in to check their performance.",

  re_evaluation_query:
    "Students can apply for re-evaluation after results are declared through the official system.",

  drop_course_query:
    "Courses can be dropped within the initial weeks of the semester with approval.",

  campus_facility_query:
    "Campus facilities include labs, library, sports complex, gym, and student activity centers.",

  fallback:
    "I'm sorry, I didn't understand that. Please ask about fees, exams, admissions, or campus facilities."
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
