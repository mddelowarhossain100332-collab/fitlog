"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";


export default function Navbar() {
  const pathname = usePathname(); // current page link, e.g. "/" or "/my-plan"
  const { plan, saved } = usePlan();

  // Active link looks different (highlighted)
  function linkClass(href) {
    const base = "rounded-lg px-3 py-1.5 text-sm font-medium transition";
    if (pathname === href) return base + " bg-base-300 text-primary";
    return base + " text-base-content/60 hover:text-white";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/80 backdrop-blur">
      <div className="navbar mx-auto min-h-[66px] max-w-[1280px] px-6">
        {/* eikhane logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <img src="/logo.png" alt="FitLog logo" className="h-8 w-8 rounded-full" /> <strong>FITLOG</strong>
          </Link>
        </div>

      
        <div className="navbar-center gap-1">
          <Link href="/" className={linkClass("/")}>Workouts</Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>My Plan</Link>
        </div>

        {/* counters */}
        <div className="navbar-end gap-2">
          <Link href="/my-plan" className="badge badge-primary font-semibold">Plan {plan.length}</Link>
          <Link href="/my-plan" className="badge badge-outline font-semibold">Saved {saved.length}</Link>
        </div>
      </div>
    </header>
  );
}
