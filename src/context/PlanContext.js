"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PlanContext = createContext();

// Other files use this to get the plan data
export function usePlan() {
  return useContext(PlanContext);
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);   // Today's Plan
  const [saved, setSaved] = useState([]); // Saved
  const [done, setDone] = useState([]);   // ids of finished workouts
  const [ready, setReady] = useState(false);

  // When the site opens, load old data from localStorage
  useEffect(() => {
    try {
      const old = JSON.parse(localStorage.getItem("fitlog"));
      if (old) {
        setPlan(old.plan || []);
        setSaved(old.saved || []);
        setDone(old.done || []);
      }
    } catch (e) {}
    setReady(true);
  }, []);

  // Every time the data changes, save it to localStorage
  useEffect(() => {
    if (ready) {
      localStorage.setItem("fitlog", JSON.stringify({ plan, saved, done }));
    }
  }, [plan, saved, done, ready]);

  function addToPlan(workout) {
    if (plan.some((w) => w.id === workout.id)) {
      toast.error("Already in today's plan");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Plan is full. Only 5 lifts allowed.");
      return;
    }
    setPlan([...plan, workout]);
    toast.success("Added to today's plan");
  }

  function addToSaved(workout) {
    if (saved.some((w) => w.id === workout.id)) {
      toast.error("Already saved");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Removed from today's plan");
  }

  function removeFromSaved(id) {
    setSaved(saved.filter((w) => w.id !== id));
    toast.success("Removed from saved");
  }

  function markAsDone(id) {
    if (done.includes(id)) return;
    setDone([...done, id]);
    toast.success("Marked as done. Great work!");
  }

  const value = { plan, saved, done, ready, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markAsDone };

  return (
    <PlanContext.Provider value={value}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#15171d", color: "#fff", border: "1px solid #222630" } }}
      />
    </PlanContext.Provider>
  );
}
