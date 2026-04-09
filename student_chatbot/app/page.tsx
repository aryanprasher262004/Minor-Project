import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Smart Education Private University</h1>
          <p className="text-xl text-blue-100">Empowering Minds, Shaping the Future.</p>
          <div className="inline-block bg-white/20 px-6 py-2 rounded-full text-blue-50 font-medium mb-4">
            🎓 Admissions Open 2026
          </div>
          <div className="pt-4">
            <Link href="/admissions" className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Apply Now
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-6 italic">
            💬 Ask me anything about admissions, fees, courses in the chat below!
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">Why Choose SEPU?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">📚</div>
            <h3 className="text-xl font-semibold mb-3">Industry-Ready Courses</h3>
            <p className="text-slate-600">Curriculum designed by experts to keep you ahead in the rapidly evolving tech and business world.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">💼</div>
            <h3 className="text-xl font-semibold mb-3">Top Placements</h3>
            <p className="text-slate-600">Our students land roles in top tier companies with an average package of ₹6 LPA.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">🏛️</div>
            <h3 className="text-xl font-semibold mb-3">Vibrant Campus Life</h3>
            <p className="text-slate-600">Experience world-class facilities, clubs, and fests that shape your overall personality.</p>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="max-w-4xl mx-auto px-4 w-full">
        <div className="bg-slate-100 p-6 md:p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Latest Announcements</h2>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
              <span className="text-blue-600 font-bold mt-1">New</span>
              <p className="text-slate-700">Early bird scholarships available for applications submitted before August 2025.</p>
            </li>
            <li className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
              <span className="text-slate-400 font-bold mt-1">Info</span>
              <p className="text-slate-700">Campus tours are now open every Saturday. Book your slot today!</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}