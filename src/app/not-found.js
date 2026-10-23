import Link from "next/link";

// Shows for any unknown route
export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <h1 className="font-display text-8xl font-bold text-primary">404</h1>
        <p className="mb-6 mt-2 text-base-content/60">This page skipped leg day and got lost.</p>
        <Link href="/" className="btn btn-primary rounded-xl">Go to workouts</Link>
      </div>
    </div>
  );
}
