import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import { useNavigate } from "react-router-dom";

export const ExercisesPage = () => {
  const navigate = useNavigate();

  const categories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];
  const exercises = (getCache(LS_KEYS.EXERCISES) as any[]) || [];

  // Group exercises by category
  const grouped = categories.map((cat: any) => ({
    ...cat,
    exercises: exercises.filter((e: any) => e.category_id === cat.id),
  }));

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-lg font-semibold">Exercises</h1>

      {grouped.map((cat: any) => (
        <div key={cat.id}>
          {/* Category title */}
          <h2 className="text-sm font-medium text-gray-400 mb-2">{cat.name}</h2>

          {/* Exercises */}
          <div className="space-y-2">
            {cat.exercises.length === 0 && (
              <p className="text-xs text-gray-500">No exercises</p>
            )}

            {cat.exercises.map((ex: any) => (
              <button
                key={ex.id}
                onClick={() => navigate(`/exercise/${ex.id}`)}
                className="
                  w-full text-left
                  px-4 py-3
                  rounded-xl
                  bg-surface
                  hover:bg-white/10
                  transition
                "
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{ex.name}</span>

                  <span className="text-xs text-gray-400">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
