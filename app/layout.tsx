import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fasal — Precision Agriculture for Southeast Asia",
  description:
    "IoT crop intelligence for Malaysia and Philippines plantations. Cut water use 30–40%, improve yields, and automate irrigation. Request a pilot or become a distributor.",
  openGraph: {
    title: "Fasal — Precision Agriculture for Southeast Asia",
    description:
      "IoT crop intelligence for Malaysia and Philippines plantations. Cut water use 30–40%, improve yields, and automate irrigation.",
    type: "website",
  },
};

// TODO: Add cookie consent banner before enabling any analytics

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1c1917]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
