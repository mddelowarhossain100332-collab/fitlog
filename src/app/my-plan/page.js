"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import StatsRow from "@/components/StatsRow";

export default function MyPlanPage() {
  const { plan, saved, done, ready, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
  const [tab, setTab] = useState("plan"); // "plan" or "saved"

  // Which list to show
  const list = tab === "plan" ? plan : saved;

  // Numbers for the 3 metric cards (only for Today's Plan)
  let totalMinutes = 0;
  let totalCalories = 0;
  plan.forEach((w) => {
    totalMinutes += w.duration;
    totalCalories += w.calories;
  });

  const metrics = [
    ["Exercises", plan.length],
    ["Minutes", totalMinutes],
    ["Calories", totalCalories],
  ];

  function handleRemove(id) {
    if (tab === "plan") removeFromPlan(id);
    else removeFromSaved(id);
  }

  return (
    <div className="mx-auto max-w-[1184px] py-10">
      <h1 className="font-display text-4xl font-bold">MY PLAN</h1>
      <p className="mt-1 text-base-content/60">Cap of five lifts for today. Finish them, then load more.</p>

      {/* 3 metric cards */}
      <div className="my-6 grid gap-4 sm:grid-cols-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-base-300 bg-base-200 px-5 py-4">
            <p className="text-xs uppercase tracking-wider text-base-content/60">{label}</p>
            <p className="font-display text-3xl font-bold text-primary">{value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab("plan")}
          className={tab === "plan" ? "btn btn-primary btn-sm rounded-lg" : "btn btn-ghost btn-sm rounded-lg"}
        >
          Today's Plan
        </button>
        <button
          onClick={() => setTab("saved")}
          className={tab === "saved" ? "btn btn-primary btn-sm rounded-lg" : "btn btn-ghost btn-sm rounded-lg"}
        >
          Saved
        </button>
      </div>

      {/* Loading */}
      {!ready ? (
        <p className="py-16 text-center text-base-content/60">Loading workouts…</p>
      ) : list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
          <h2 className="font-display text-3xl font-bold">NOTHING HERE YET</h2>
          <p className="mb-6 mt-2 text-base-content/60">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn btn-primary rounded-xl">Go to workouts</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((w) => {
            const isDone = done.includes(w.id);
            return (
              <div
                key={w.id}
                className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 md:flex-row md:items-center"
              >
                <img src={w.image} alt={w.name} className="h-20 w-full rounded-lg object-cover md:w-36" />

                <div className="flex-1 space-y-1">
                  <h3 className={`font-display text-xl font-bold uppercase ${isDone ? "line-through opacity-50" : ""}`}>
                    {w.name}
                  </h3>
                  <p className="text-sm text-base-content/60">{w.equipment}</p>
                  <StatsRow workout={w} />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/workout/${w.id}`} className="btn btn-outline btn-sm rounded-lg border-base-300">
                    View Details
                  </Link>
                  {tab === "plan" && (
                    <button
                      onClick={() => markAsDone(w.id)}
                      disabled={isDone}
                      className="btn btn-primary btn-sm rounded-lg"
                    >
                      <Check size={16} /> {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(w.id)}
                    aria-label="Remove"
                    className="btn btn-square btn-ghost btn-sm"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
