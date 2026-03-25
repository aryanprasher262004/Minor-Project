export default function AdmissionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Admissions 2026</h1>
      
      <div className="space-y-8">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Eligibility Criteria</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Minimum 60% aggregate in 10+2 (PCM for B.Tech).</li>
            <li>Valid SEPU Entrance Exam score.</li>
            <li>Graduation degree required for MBA admissions.</li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Admission Steps</h2>
          <ol className="list-decimal pl-5 space-y-4 text-slate-700">
            <li><strong>Register Online:</strong> Fill the basic details on the portal.</li>
            <li><strong>Submit Application:</strong> Upload required documents and pay the application fee.</li>
            <li><strong>Entrance Exam:</strong> Appear for the online assessment.</li>
            <li><strong>Interview:</strong> Shortlisted candidates undergo a personal interview.</li>
            <li><strong>Offer Letter:</strong> Pay the token fee to secure your seat.</li>
          </ol>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">Important Dates</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex justify-between border-b border-blue-200 pb-2">
                <span>Applications Open</span> <strong>Jan 15, 2026</strong>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-2">
                <span>Entrance Exam</span> <strong>April 10, 2026</strong>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-2">
                <span>Merit List</span> <strong>May 5, 2026</strong>
              </li>
            </ul>
          </section>

          <section className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">Required Documents</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>10th and 12th Marksheets</li>
              <li>Aadhar Card / Identity Proof</li>
              <li>Passport Size Photographs</li>
              <li>Transfer Certificate</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}