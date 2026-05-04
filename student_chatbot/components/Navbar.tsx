"use client";

import Link from "next/link";
import { useTheme, useAuth } from "@/lib/providers";
import { Sun, Moon, Bell, Menu, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="h-16 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border flex items-center justify-between px-4 lg:px-8 z-10 shrink-0 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="md:hidden flex items-center gap-2">
          <Menu className="w-6 h-6 text-light-text-primary dark:text-dark-text-primary" />
          <Link href="/" className="text-2xl font-bold text-light-primary dark:text-dark-primary">
            CampusX
          </Link>
        </div>
        <div className="hidden md:block h-6 w-px bg-light-border dark:bg-dark-border"></div>
        <span className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary hidden md:block">
          Student Portal
        </span>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="#" className="hover:text-light-primary dark:hover:text-dark-primary cursor-pointer flex items-center gap-1 transition-colors">
            📚 LMS
          </Link>
          <Link href="#" className="hover:text-light-primary dark:hover:text-dark-primary cursor-pointer flex items-center gap-1 transition-colors">
            🔧 Service Request
          </Link>
          <Link href="#" className="hover:text-light-primary dark:hover:text-dark-primary cursor-pointer flex items-center gap-1 transition-colors">
            🏛️ Library
          </Link>
        </div>
        
        <div className="h-6 w-px bg-light-border dark:bg-dark-border hidden sm:block"></div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-light-surface2 dark:bg-dark-surface2 flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button className="w-9 h-9 rounded-full bg-light-surface2 dark:bg-dark-surface2 flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-border dark:hover:bg-dark-border transition-colors">
            <Bell className="w-4 h-4" />
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-light-primary dark:bg-dark-primary text-white flex items-center justify-center font-bold" title={user?.name}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <button 
                onClick={logout}
                className="w-9 h-9 rounded-full bg-light-surface2 dark:bg-dark-surface2 flex items-center justify-center text-light-error dark:text-dark-error hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              className="px-4 py-2 rounded-md bg-light-primary dark:bg-dark-primary text-white text-sm font-medium hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}