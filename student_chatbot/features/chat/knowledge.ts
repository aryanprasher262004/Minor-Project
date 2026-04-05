export const knowledgeBase: Record<string, string> = {
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

/**
 * Returns the corresponding answer for a given intent.
 * @param intent The detected NLP intent.
 * @returns The appropriate text response.
 */
export function getAnswer(intent: string): string {
  if (knowledgeBase[intent]) {
    return knowledgeBase[intent];
  }
  return knowledgeBase["fallback"];
}
