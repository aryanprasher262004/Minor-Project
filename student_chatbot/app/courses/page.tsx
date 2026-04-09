export default function CoursesPage() {
  const courses = [
    {
      title: "B.Tech (Computer Science)",
      duration: "4 Years",
      desc: "Comprehensive engineering program focusing on AI, Cloud Computing, and modern software development.",
      icon: "💻"
    },
    {
      title: "Master of Business Administration (MBA)",
      duration: "2 Years",
      desc: "Advanced management concepts, leadership skills, and industry-oriented specializations in Finance, Marketing, and HR.",
      icon: "📊"
    },
    {
      title: "Bachelor of Business Administration (BBA)",
      duration: "3 Years",
      desc: "Foundational business and management principles to kickstart your corporate journey.",
      icon: "📈"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Programs</h1>
      <p className="text-lg text-slate-600 mb-12">Discover industry-aligned programs designed to propel your career.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-4">{course.icon}</div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{course.title}</h2>
            <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
              {course.duration}
            </span>
            <p className="text-slate-600 flex-1">{course.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}