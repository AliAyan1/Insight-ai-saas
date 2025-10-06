// File: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/app/providers/page"
import { Toaster } from "@/components/ui/sonner"; // <-- IMPORT THE TOASTER

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InsightAI SaaS",
  description: "AI-Powered Analytics for Your Business",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
          <Toaster position="bottom-right" richColors /> {/* <-- ADD THE TOASTER COMPONENT HERE */}
        </NextAuthProvider>
      </body>
    </html>
  );
}