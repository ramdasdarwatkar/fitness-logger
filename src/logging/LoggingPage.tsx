import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import { getSessionById, finishSession } from "../workout/session.service";
import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import { ExerciseLogger } from "./ExerciseLogger";

export const LoggingPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const exercises = (getCache(LS_KEYS.EXERCISES) as any[]) || [];
  const categories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];

  const [session, setSession] = useState<any>(null);
  const [logsByExercise, setLogsByExercise] = useState<Record<string, any[]>>(
    {},
  );
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  const load = async () => {
    if (!sessionId) return;

    const s = await getSessionById(sessionId);
    setSession(s);

    const { data } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("session_id", sessionId)
      .order("sets", { ascending: true });

    const map: Record<string, any[]> = {};
    data?.forEach((row: any) => {
      if (!map[row.exercise_id]) map[row.exercise_id] = [];
      map[row.exercise_id].push(row);
    });

    setLogsByExercise(map);
  };

  useEffect(() => {
    load();
  }, [sessionId]);

  if (!session) return null;

  const isCompleted = session.completed === true;

  const allowedCategoryIds = session.notes
    ? categories
        .filter((c: any) => session.notes.includes(c.name))
        .map((c: any) => c.id)
    : [];

  const availableExercises = exercises.filter(
    (e: any) =>
      !allowedCategoryIds.length || allowedCategoryIds.includes(e.category_id),
  );

  const selectedExercise = exercises.find(
    (e: any) => e.id === selectedExerciseId,
  );

  return (
    <div className="p-4 space-y-4">
      <select
        disabled={isCompleted}
        value={selectedExerciseId}
        onChange={(e) => setSelectedExerciseId(e.target.value)}
        className="w-full p-3 bg-surface rounded disabled:opacity-50"
      >
        <option value="">Select Exercise</option>
        {availableExercises.map((e: any) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>

      {selectedExercise && (
        <ExerciseLogger
          key={selectedExercise.id}
          sessionId={sessionId!}
          exercise={selectedExercise}
          previousLogs={logsByExercise[selectedExercise.id] || []}
          readOnly={isCompleted}
          onSaved={async () => {
            await load(); // refresh logs
            setSelectedExerciseId(""); // 🔑 reset UI
          }}
        />
      )}
      {!isCompleted && (
        <button
          onClick={async () => {
            await finishSession(sessionId!);
            await load();
            navigate(`/logbook/${sessionId}`);
          }}
          className="w-full py-3 bg-red-600 text-white rounded"
        >
          Finish Session
        </button>
      )}
    </div>
  );
};
