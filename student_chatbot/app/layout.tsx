import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider, AuthProvider } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampusX | Student Portal",
  description: "Smart Education Private University Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex overflow-hidden bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary transition-colors duration-200`}>
        <ThemeProvider>
          <AuthProvider>
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-light-bg dark:bg-dark-bg">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-light-bg dark:bg-dark-bg transition-colors duration-200">
                {children}
              </main>
            </div>
            <Chatbot />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}