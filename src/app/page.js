"use client";
import { useEffect, useState } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  // Get data from the API when the page opens
  useEffect(() => {
    getAllWorkouts()
      .then((data) => setWorkouts(data))
      .catch((err) => console.log("Could not load workouts", err))
      .finally(() => setLoading(false));
  }, []);

  // Sort a copy of the list (highest first)
  const sorted = [...workouts].sort((a, b) => Number(b[sortBy]) - Number(a[sortBy]));

  return (
    <>
      {/*heero section*/}
      <section className="my-10 grid overflow-hidden rounded-2xl border border-base-300 bg-base-200 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 lg:p-14">
          <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-primary">WORKOUT LIBRARY</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-tight lg:text-6xl">
            Train with intent. <span className="text-primary">Log every set.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base-content/60">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan,
            and watch the week's work add up.
          </p>
          {/* This is an anchor link. It scrolls down to #library */}
          <a href="#library" className="btn btn-primary mt-8 h-11 w-fit rounded-xl px-6">
            BROWSE WORKOUTS <ArrowDown size={18} />
          </a>
        </div>
        <div className="h-72 bg-black lg:h-[448px]">
          <img src="/banner.png" alt="Workout banner" className="h-full w-full object-contain" />
        </div>
      </section>

      {/*LIBRARY */}
      <section id="library" className="scroll-mt-20 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-bold">THE LIBRARY</h2>
            <p className="mt-1 text-base-content/60">Twelve lifts covering every major muscle group.</p>
          </div>

          {/* Sort dropdown */}
          <label className="flex items-center gap-2 text-sm text-base-content/60">
            Sort By
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-sm w-36 appearance-none border-base-300 bg-base-200 text-white"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-2.5" />
            </div>
          </label>
        </div>

        {/* Loadin grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
