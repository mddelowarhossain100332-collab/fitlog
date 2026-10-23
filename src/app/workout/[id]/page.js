"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Bookmark } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

export default function DetailsPage() {
  const { id } = useParams(); // the id from the url
  const { plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWorkout(id)
      .then((data) => setWorkout(data))
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return <p className="py-24 text-center text-base-content/60">Workout not found.</p>;
  }
  if (!workout) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Key specs rows
  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.calories} kcal`],
    ["RATING", workout.rating],
  ];

  // Disable the button when the plan already has 5 lifts
  const planFull = plan.length >= 5 && !plan.some((w) => w.id === workout.id);

  return (
    <div className="grid gap-10 py-10 lg:grid-cols-2">
      {/* Left: big image */}
      <div className="overflow-hidden rounded-2xl border border-base-300">
        <img src={workout.image} alt={workout.name} className="h-full max-h-[735px] w-full object-cover" />
      </div>

      {/* Right: information */}
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase">{workout.name}</h1>
          <p className="mt-3 text-base-content/60">{workout.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {workout.categories.map((c) => (
            <span key={c} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-black">{c}</span>
          ))}
        </div>

        {/* Key specs table */}
        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200">
          <table className="table">
            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label} className="border-base-300">
                  <td className="text-xs tracking-wider text-base-content/60">{label}</td>
                  <td className="text-right font-semibold">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="mb-3 font-display text-2xl font-bold">INSTRUCTIONS</h2>
          <ol className="space-y-3">
            {workout.steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-base-content/80">
                <span className="badge badge-primary shrink-0 font-bold">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(workout)}
            disabled={planFull}
            className="btn btn-primary h-11 rounded-xl"
          >
            <Plus size={18} /> Add to today's plan
          </button>
          <button onClick={() => addToSaved(workout)} className="btn btn-outline h-11 rounded-xl border-base-300">
            <Bookmark size={18} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
