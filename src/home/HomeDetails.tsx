import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useWorkoutStore } from "../workout/workout.store";
import { useAuthStore } from "../auth/auth.store";
import { createOrGetSessionForDate } from "../workout/session.service";
import { CategorySelectModal } from "../modals/CategorySelectModal";
import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import PageTransition from "../shared/ui/PageTransition";

interface Props {
  selectedDate: string;
}

export const HomeDetails = ({ selectedDate }: Props) => {
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.userId);
  const sessions = useWorkoutStore((s) => s.sessions);

  const session = sessions.find((s) => s.workout_date === selectedDate);

  const today = dayjs().format("YYYY-MM-DD");
  const isToday = selectedDate === today;
  const isPast = dayjs(selectedDate).isBefore(today);
  const isFuture = dayjs(selectedDate).isAfter(today);
  const isCompleted = session?.completed === true; // ✅ ADD (read-only flag)

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [remainingCategoryIds, setRemainingCategoryIds] = useState<string[]>(
    [],
  );

  /* ---------------- helpers ---------------- */

  const getRemainingCategoryIds = () => {
    if (!session?.notes) return [];

    const existingNames = session.notes
      .split(" - ")
      .map((n: string) => n.trim());

    const categories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];

    return categories
      .filter((c: any) => !existingNames.includes(c.name))
      .map((c: any) => c.id);
  };

  /* ---------------- handlers ---------------- */

  const handleStartWorkout = () => {
    setRemainingCategoryIds([]);
    setShowCategoryModal(true);
  };

  const handleUpdateCategories = () => {
    setRemainingCategoryIds(getRemainingCategoryIds());
    setShowCategoryModal(true);
  };

  const handleCategoryGo = async (selectedCategoryIds: string[]) => {
    if (!userId) return;

    const updatedSession = await createOrGetSessionForDate(
      userId,
      selectedDate, // ✅ IMPORTANT
      selectedCategoryIds,
    );

    setShowCategoryModal(false);
    navigate(`/logging/${updatedSession.id}`);
  };

  /* ----------------------------------------- */

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto px-4 py-5">
        {/* Centered date */}
        <div className="flex justify-center mb-4">
          <h2 className="text-sm font-medium text-gray-300">
            {dayjs(selectedDate).format("dddd, DD MMM YYYY")}
          </h2>
        </div>

        {/* FUTURE DATE */}
        {isFuture && (
          <p className="text-sm text-gray-400">
            You can’t start a workout for a future date.
          </p>
        )}

        {/* PAST DATE – NO WORKOUT */}
        {isPast && !session && (
          <p className="text-sm text-gray-400">
            No workout performed on this day.
          </p>
        )}

        {/* SESSION CARD */}
        {session && (
          <div
            onClick={() => navigate(`/logbook/${session.id}`)}
            className="
            mt-4
            cursor-pointer
            rounded-2xl
            p-5
            bg-white/10
            backdrop-blur-md
            border border-white/20
            shadow-lg
            transition
            hover:bg-white/15
          "
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                🏋️
              </div>

              <div className="flex-1">
                <p className="font-medium">Workout Session</p>
                <p className="text-xs text-gray-400">
                  {session.completed ? "Completed" : "In progress"}
                </p>
              </div>

              {session.completed && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary text-black">
                  Done
                </span>
              )}
            </div>

            <p className="text-sm text-gray-200 leading-relaxed">
              {session.notes || "Workout"}
            </p>

            <div className="mt-4 text-xs text-gray-400 flex justify-between">
              <span>Tap to view logbook</span>
              <span>→</span>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        {isToday && !session && (
          <button
            onClick={handleStartWorkout}
            className="w-full mt-8 py-3 rounded-xl bg-primary text-black font-semibold"
          >
            Start Workout
          </button>
        )}

        {/* IMPORTANT: hide buttons if completed */}
        {isToday && session && !isCompleted && (
          <div className="space-y-3 mt-8">
            <button
              onClick={handleUpdateCategories}
              className="w-full py-3 rounded-xl bg-primary text-black font-semibold"
            >
              Update Categories
            </button>

            <button
              onClick={() => navigate(`/logging/${session.id}`)}
              className="w-full py-3 rounded-xl bg-surface border border-gray-600"
            >
              Log Exercises
            </button>
          </div>
        )}

        {/* CATEGORY MODAL */}
        {showCategoryModal && (
          <CategorySelectModal
            availableCategoryIds={
              remainingCategoryIds.length ? remainingCategoryIds : undefined
            }
            onClose={() => setShowCategoryModal(false)}
            onGo={handleCategoryGo}
          />
        )}
      </div>
    </PageTransition>
  );
};
