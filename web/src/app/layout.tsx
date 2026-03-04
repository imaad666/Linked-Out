import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainHeader } from "@/components/layout/MainHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linked Out",
  description:
    "A place to archive your non-career wins, fuck ups, and weird milestones. The anti-LinkedIn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <div className="min-h-screen">
          <MainHeader />
          <div className="bg-[#0a66c2]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}


