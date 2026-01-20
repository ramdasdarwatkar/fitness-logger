import { useState } from "react";
import { setCache, getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import { createExercise, updateExercise } from "./exercise.service";

interface Props {
  exercise?: any; // if present → edit mode
  onClose: () => void;
  onSaved: () => void;
}

export const ExerciseFormModal = ({ exercise, onClose, onSaved }: Props) => {
  const categories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];

  const [name, setName] = useState(exercise?.name ?? "");
  const [categoryId, setCategoryId] = useState<string | null>(
    exercise?.category_id ?? null,
  );

  const [metrics, setMetrics] = useState<Record<string, boolean>>({
    sets: exercise?.metrics?.sets ?? true,
    reps: exercise?.metrics?.reps ?? false,
    weight: exercise?.metrics?.weight ?? false,
    duration: exercise?.metrics?.duration ?? false,
    distance: exercise?.metrics?.distance ?? false,
  });

  const toggleMetric = (key: string) => {
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const save = async () => {
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      category_id: categoryId,
      metrics: {
        sets: !!metrics.sets,
        reps: !!metrics.reps,
        weight: !!metrics.weight,
        duration: !!metrics.duration,
        distance: !!metrics.distance,
      },
    };

    let savedExercise;

    if (exercise) {
      savedExercise = await updateExercise(exercise.id, payload);
    } else {
      savedExercise = await createExercise(payload);
    }

    // 🔑 UPDATE CACHE
    const existing = (getCache(LS_KEYS.EXERCISES) as any[]) || [];

    const updatedExercises = exercise
      ? existing.map((e) => (e.id === savedExercise.id ? savedExercise : e))
      : [...existing, savedExercise];

    setCache(LS_KEYS.EXERCISES, updatedExercises);

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-surface w-full max-w-sm rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold">
          {exercise ? "Edit Exercise" : "Add Exercise"}
        </h2>

        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Exercise name"
          className="w-full p-3 rounded bg-bg"
        />

        {/* Category */}
        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(e.target.value || null)}
          className="w-full p-3 rounded bg-bg"
        >
          <option value="">Select category</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Metrics */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Metrics</p>
          {["sets", "reps", "weight", "duration", "distance"].map((m) => (
            <label key={m} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={metrics[m]}
                onChange={() => toggleMetric(m)}
              />
              <span className="capitalize">{m}</span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2 rounded bg-gray-700">
            Cancel
          </button>
          <button
            onClick={save}
            className="flex-1 py-2 rounded bg-primary text-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
