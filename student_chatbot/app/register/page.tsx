"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/providers";
import { Button } from "@/components/Button";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      // Mock registration
      login(name, email);
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl border border-light-border dark:border-dark-border p-8 transition-colors duration-200">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-light-primary dark:bg-dark-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4">
            X
          </div>
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Create an Account</h1>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
            Join CampusX to access the student portal
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-light-text-muted dark:text-dark-text-muted" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-input-bg dark:bg-dark-input-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary outline-none transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-light-text-muted dark:text-dark-text-muted" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-input-bg dark:bg-dark-input-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary outline-none transition-colors"
                placeholder="student@campusx.edu"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-light-text-muted dark:text-dark-text-muted" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-input-bg dark:bg-dark-input-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            Register
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-light-text-secondary dark:text-dark-text-secondary">
            Already have an account?{" "}
          </span>
          <Link href="/login" className="font-medium text-light-primary dark:text-dark-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
