import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-base-content/60 sm:flex-row">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <img src="/logo.png" alt="FitLog logo" className="h-6 w-6 rounded-full" />  
          FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
