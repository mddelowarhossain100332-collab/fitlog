import { Clock, Flame, Star } from "lucide-react";

// Shows: duration, calories and rating with icons
export default function StatsRow({ workout }) {
  return (
    <div className="flex items-center gap-4 text-xs text-base-content/60">
      <span className="flex items-center gap-1"><Clock size={14} /> {workout.duration} min</span>
      <span className="flex items-center gap-1"><Flame size={14} /> {workout.calories} kcal</span>
      <span className="flex items-center gap-1"><Star size={14} className="text-primary" /> {workout.rating}</span>
    </div>
  );
}
