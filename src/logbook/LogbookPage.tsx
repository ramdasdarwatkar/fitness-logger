import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import { getSessionById } from "../workout/session.service";
import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import PageTransition from "../shared/ui/PageTransition";

const LogbookPage = () => {
  const { sessionId } = useParams();
  const exercises = (getCache(LS_KEYS.EXERCISES) as any[]) || [];

  const [session, setSession] = useState<any>(null);
  const [logsByExercise, setLogsByExercise] = useState<Record<string, any[]>>(
    {},
  );

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

      const grouped: Record<string, any[]> = {};
      data?.forEach((log: any) => {
        if (!grouped[log.exercise_id]) grouped[log.exercise_id] = [];
        grouped[log.exercise_id].push(log);
      });

      setLogsByExercise(grouped);
    };

    load();
  }, [sessionId]);

  if (!session) return null;

  return (
    <PageTransition>
      <div className="p-4 space-y-5">
        {/* HEADER */}
        <div className="rounded-2xl p-4 bg-white/10 backdrop-blur border border-white/20">
          <p className="text-xs text-gray-400">
            {dayjs(session.workout_date).format("dddd, DD MMM YYYY")}
          </p>
          <h2 className="text-base font-semibold mt-1">Workout Logbook</h2>
          <p className="mt-2 text-xs text-gray-200">
            {session.notes || "Workout"}
          </p>
        </div>

        {/* EXERCISE GRID – ALWAYS 2 COLUMNS */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(logsByExercise).map(([exerciseId, logs]) => {
            const exercise = exercises.find((e: any) => e.id === exerciseId);
            if (!exercise) return null;

            const metrics = exercise.metrics || {};

            return (
              <div
                key={exerciseId}
                className="
                rounded-xl
                p-3
                bg-gradient-to-br
                from-white/10
                via-white/5
                to-transparent
                border border-white/10
                backdrop-blur-md
              "
              >
                {/* Exercise title */}
                <h3 className="text-sm font-semibold text-primary mb-2 truncate">
                  {exercise.name}
                </h3>

                {/* COLUMN HEADERS */}
                <div
                  className="
                  grid
                  grid-cols-[28px_repeat(4,1fr)]
                  text-[10px]
                  text-gray-400
                  mb-1
                "
                >
                  <span>#</span>
                  {metrics.weight && <span className="text-center">kg</span>}
                  {metrics.reps && <span className="text-center">reps</span>}
                  {metrics.duration && (
                    <span className="text-center">time</span>
                  )}
                  {metrics.distance && (
                    <span className="text-center">dist</span>
                  )}
                </div>

                {/* ROWS */}
                <div className="space-y-0.5 text-[11px]">
                  {logs.map((log: any, idx: number) => {
                    const duration =
                      log.duration != null
                        ? `${Math.floor(log.duration / 60)}:${String(
                            log.duration % 60,
                          ).padStart(2, "0")}`
                        : "";

                    const distance =
                      log.distance != null
                        ? log.distance >= 1
                          ? `${log.distance.toFixed(1)}`
                          : `${Math.round(log.distance * 1000)}`
                        : "";

                    return (
                      <div
                        key={log.id}
                        className="
                        grid
                        grid-cols-[28px_repeat(4,1fr)]
                        items-center
                        text-gray-200
                      "
                      >
                        <span className="text-gray-400">{idx + 1}</span>

                        {metrics.weight && (
                          <span className="text-center">
                            {log.weight ?? ""}
                          </span>
                        )}

                        {metrics.reps && (
                          <span className="text-center">{log.reps ?? ""}</span>
                        )}

                        {metrics.duration && (
                          <span className="text-center">{duration}</span>
                        )}

                        {metrics.distance && (
                          <span className="text-center">{distance}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
};

export default LogbookPage;
