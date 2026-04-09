"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", href: "/", icon: "🏠" },
    { name: "Admissions", href: "/admissions", icon: "📝" },
    { name: "Courses", href: "/courses", icon: "📚" },
    { name: "Fees", href: "/fees", icon: "💳" },
    { name: "Placements", href: "/placements", icon: "💼" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen bg-[#2e1065] text-white shadow-xl z-20 transition-all duration-300">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10">
        <span className="text-2xl font-bold tracking-wider text-blue-300">SEPU</span>
      </div>
      <div className="flex-1 py-6 space-y-2 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${
                isActive ? "bg-white/20 border-l-4 border-blue-400" : "hover:bg-white/10 border-l-4 border-transparent"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden lg:block font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}