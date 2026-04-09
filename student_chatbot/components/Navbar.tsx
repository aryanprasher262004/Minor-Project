export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <div className="md:hidden text-2xl font-bold text-[#2e1065]">SEPU</div>
        <div className="hidden md:block h-6 w-px bg-slate-300"></div>
        <span className="text-lg font-semibold text-slate-700">Student Portal</span>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-600">
          <span className="hover:text-blue-600 cursor-pointer flex items-center gap-1">📚 LMS</span>
          <span className="hover:text-blue-600 cursor-pointer flex items-center gap-1">🔧 Service Request</span>
          <span className="hover:text-blue-600 cursor-pointer flex items-center gap-1">🏛️ Library</span>
        </div>
        <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
            🔔
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            GS
          </div>
        </div>
      </div>
    </header>
  );
}