// The API link. If it does not work, use the alternative link from the README.
const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// Make sure we always get an array
function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

// Find a value from the API object.
// First we try the names we expect, then we search for any key that looks like the pattern.
function pick(obj, names, pattern) {
  for (const name of names) {
    if (obj[name] !== undefined && obj[name] !== null) return obj[name];
  }
  if (pattern) {
    const key = Object.keys(obj).find((k) => pattern.test(k) && obj[k] !== null && obj[k] !== undefined);
    if (key) return obj[key];
  }
  return undefined;
}

// Turn a value into a list of text.
// Works for ["Chest","Arms"], "Chest, Arms" and [{name:"Chest"}]
function toTextList(value) {
  const list = [];
  toArray(value).forEach((item) => {
    if (typeof item === "object" && item !== null) {
      const text = item.name ?? item.title ?? item.label;
      if (text) list.push(String(text));
    } else if (typeof item === "string") {
      item.split(",").forEach((part) => {
        if (part.trim()) list.push(part.trim());
      });
    }
  });
  return list;
}

// Clean one workout from the API, so the rest of the app can use simple names
export function cleanWorkout(w) {
  return {
    id: String(pick(w, ["id", "_id"])),
    name: pick(w, ["name", "title"], /name|title/i) ?? "",
    image: pick(w, ["image", "img", "thumbnail", "photo"], /image|img|thumb|photo|picture/i) ?? "",
    categories: toTextList(pick(w, ["categories", "category", "tags", "muscleGroups", "muscles"], /categor|tag|muscle|body|group/i)),
    equipment: toTextList(pick(w, ["equipment", "equipments"], /equip/i)).join(", "),
    duration: parseInt(pick(w, ["duration", "time", "minutes"], /durat|time|minute/i)) || 0,
    calories: parseInt(pick(w, ["calories", "kcal", "caloriesBurned", "calorie"], /cal/i)) || 0,
    rating: pick(w, ["rating", "rate", "score"], /rat|score/i),
    difficulty: pick(w, ["difficulty", "level"], /difficult|level/i),
    sets: pick(w, ["sets"], /set/i),
    reps: pick(w, ["reps", "repetitions"], /rep/i),
    description: pick(w, ["description", "desc", "summary"], /desc|summary|about/i) ?? "",
    steps: toTextList(pick(w, ["instructions", "steps"], /instruct|step|how/i)),
  };
}

// Get all workouts
export async function getAllWorkouts() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  const list = toArray(data.data ?? data.workouts ?? data.fitlog ?? data);
  // Open the browser console (F12) to see the real data from the API
  console.log("API sample:", list[0]);
  return list.map(cleanWorkout);
}

// Get one workout by id
export async function getWorkout(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  return cleanWorkout(data.data ?? data);
}
