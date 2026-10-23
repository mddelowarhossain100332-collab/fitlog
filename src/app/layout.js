import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="fitlog" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-base-100 font-sans text-base-content">
        {/* PlanProvider keeps the plan and saved lists for all pages */}
        <PlanProvider>
          <Navbar />
          <main className="mx-auto min-h-[70vh] max-w-[1280px] px-6">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
