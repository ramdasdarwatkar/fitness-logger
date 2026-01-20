import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ExerciseFormModal } from "./ExerciseFormModal";
import PageTransition from "../shared/ui/PageTransition";

const ExercisesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState<any | null>(null);

  const categories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];
  const exercises = (getCache(LS_KEYS.EXERCISES) as any[]) || [];

  const searchText = search.toLowerCase().trim();

  const grouped = categories
    .map((cat: any) => {
      const filteredExercises = exercises.filter(
        (e: any) =>
          e.category_id === cat.id &&
          (!searchText || e.name.toLowerCase().includes(searchText)),
      );

      return { ...cat, exercises: filteredExercises };
    })
    .filter((cat: any) => cat.exercises.length > 0);

  const openAdd = () => {
    setEditingExercise(null);
    setShowModal(true);
  };

  const openEdit = (exercise: any) => {
    setEditingExercise(exercise);
    setShowModal(true);
  };

  return (
    <PageTransition>
      <div className="p-4 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Exercises</h1>
          <button
            onClick={openAdd}
            className="px-3 py-2 rounded bg-primary text-black"
          >
            + Add
          </button>
        </div>

        {/* SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search exercise..."
          className="w-full px-4 py-3 rounded-xl bg-surface outline-none"
        />

        {grouped.length === 0 && (
          <p className="text-sm text-gray-400">No exercises found</p>
        )}

        {grouped.map((cat: any) => (
          <div key={cat.id}>
            <h2 className="text-sm font-medium text-gray-400 mb-2">
              {cat.name}
            </h2>

            <div className="space-y-2">
              {cat.exercises.map((ex: any) => (
                <div
                  key={ex.id}
                  className="
                  flex items-center justify-between
                  px-4 py-3
                  rounded-xl
                  bg-surface
                  hover:bg-white/10
                  transition
                "
                >
                  {/* 👉 CLICK NAME = DETAILS */}
                  <button
                    onClick={() => navigate(`/exercise/${ex.id}`)}
                    className="flex-1 text-left font-medium"
                  >
                    {ex.name}
                  </button>

                  {/* ✏️ EDIT BUTTON */}
                  <button
                    onClick={() => openEdit(ex)}
                    className="
                    text-xs
                    px-2 py-1
                    rounded
                    text-gray-400
                    hover:text-white
                    hover:bg-white/10
                  "
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {showModal && (
          <ExerciseFormModal
            exercise={editingExercise}
            onClose={() => setShowModal(false)}
            onSaved={() => {}}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default ExercisesPage;
