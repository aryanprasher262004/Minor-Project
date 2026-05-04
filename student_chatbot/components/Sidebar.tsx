"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, BookOpen, CreditCard, Briefcase } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Admissions", href: "/admissions", icon: FileText },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Fees", href: "/fees", icon: CreditCard },
    { name: "Placements", href: "/placements", icon: Briefcase },
  ];

  return (
    <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border z-20 transition-colors duration-200">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center gap-2">
          {/* A simple placeholder logo shape since we can't embed the actual image directly in JSX without importing */}
          <div className="w-8 h-8 rounded bg-light-primary dark:bg-dark-primary flex items-center justify-center text-white font-bold">
            X
          </div>
          <span className="text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary hidden lg:block">CampusX</span>
        </div>
      </div>
      <div className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider hidden lg:block mb-4">
          Main Menu
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-light-primary dark:bg-dark-primary text-white" 
                  : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface2 dark:hover:bg-dark-surface2 hover:text-light-text-primary dark:hover:text-dark-text-primary"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
              <span className="hidden lg:block font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}