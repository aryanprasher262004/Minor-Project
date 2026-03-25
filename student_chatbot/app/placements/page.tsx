export default function PlacementsPage() {
  const recruiters = ["Google", "TCS", "Infosys", "Microsoft", "Wipro", "Amazon"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Training & Placements</h1>
      <p className="text-lg text-slate-600 mb-12">100% placement assistance ensuring our students launch highly successful careers.</p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-blue-600 text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg">
          <span className="text-blue-200 text-lg font-medium mb-2">Average Package</span>
          <span className="text-5xl font-bold mb-4">₹6 LPA</span>
          <p className="text-blue-100">Consistent growth year-on-year across engineering and management disciplines.</p>
        </div>
        
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-center">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Internship Opportunities</h3>
          <p className="text-slate-600 mb-4">
            Students are mandated to undergo a 6-month industry internship in their final semester, providing hands-on experience and Pre-Placement Offers (PPOs).
          </p>
          <ul className="space-y-2 text-sm text-slate-700 font-medium">
            <li>✓ Dedicated Placement Cell</li>
            <li>✓ Resume Building Workshops</li>
            <li>✓ Mock Interviews & Aptitude Training</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Top Recruiters</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {recruiters.map((company, i) => (
            <div key={i} className="px-8 py-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-slate-500 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors">
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}