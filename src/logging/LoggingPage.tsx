import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import { getSessionById } from "../workout/session.service";
import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import { ExerciseLogger } from "./ExerciseLogger";

const LoggingPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const exercises = (getCache(LS_KEYS.EXERCISES) as any[]) || [];
  const categories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];

  const [session, setSession] = useState<any>(null);
  const [logsByExercise, setLogsByExercise] = useState<Record<string, any[]>>(
    {},
  );
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  /* ---------------- load session & logs ---------------- */

  useEffect(() => {
    if (!sessionId) return;

    const load = async () => {
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

    load();
  }, [sessionId]);

  if (!session) return null;

  /* ---------------- allowed exercises ---------------- */

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

  /* ---------------- render ---------------- */

  return (
    <div className="p-4 space-y-4">
      {/* EXERCISE SELECT */}
      <div className="space-y-1">
        <label className="text-xs text-gray-400">Select exercise</label>

        <select
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(e.target.value)}
          className="w-full p-3 rounded-xl bg-surface"
        >
          <option value="">Choose exercise</option>

          {availableExercises.map((e: any) => {
            const count = logsByExercise[e.id]?.length || 0;

            return (
              <option key={e.id} value={e.id}>
                {e.name}
                {count > 0 ? ` • ${count} sets logged` : ""}
              </option>
            );
          })}
        </select>
      </div>

      {/* LOGGER */}
      {selectedExercise && (
        <ExerciseLogger
          key={selectedExercise.id}
          sessionId={sessionId!}
          exercise={selectedExercise}
          previousLogs={logsByExercise[selectedExercise.id] || []}
          onSaved={async () => {
            // reload logs after save
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
            setSelectedExerciseId("");
          }}
        />
      )}

      {/* FINISH */}
      <button
        onClick={() => navigate(`/logbook/${sessionId}`)}
        className="w-full py-3 rounded-xl bg-red-600 text-white"
      >
        Finish Session
      </button>
    </div>
  );
};

export default LoggingPage;
