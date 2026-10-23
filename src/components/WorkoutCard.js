import Link from "next/link";
import StatsRow from "@/components/StatsRow";

// One card in the library. Clicking it opens the details page.
export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition hover:border-primary"
    >
      {/* Image on top (192px high like the design) */}
      <div className="h-48">
        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
      </div>

      <div className="p-6">
        {/* Category tag pills: filled lime, black text, fully round */}
        <div className="mb-2 flex flex-wrap gap-2">
          {workout.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-black"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold uppercase tracking-wide">{workout.name}</h3>
        <p className="mt-1 text-xs text-[#9ca3af]">{workout.equipment}</p>

        {/* Stats row with a thin line above it */}
        <div className="mt-4 border-t border-[#20242e] pt-4">
          <StatsRow workout={workout} />
        </div>
      </div>
    </Link>
  );
}
