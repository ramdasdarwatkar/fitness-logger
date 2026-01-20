import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";
import { getExerciseLogs } from "./exerciseDetails.service";
import { MonthlyLineChart } from "../shared/charts/MonthlyLineChart";
import { getPrimaryMetric, buildMonthlyHighest } from "./exerciseChart.utils";

const ExerciseDetailsPage = () => {
  const { exerciseId } = useParams();

  const exercises = (getCache(LS_KEYS.EXERCISES) as any[]) || [];
  const exercise = exercises.find((e) => e.id === exerciseId);

  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- fetch ---------------- */

  useEffect(() => {
    if (!exerciseId) return;

    const load = async () => {
      setLoading(true);
      const data = await getExerciseLogs(exerciseId);
      setLogs(data || []);
      setLoading(false);
    };

    load();
  }, [exerciseId]);

  if (!exercise) {
    return <div className="p-4">Exercise not found</div>;
  }

  /* ---------------- chart ---------------- */

  const primaryMetric = getPrimaryMetric(exercise.metrics || {});
  const chartData = primaryMetric
    ? buildMonthlyHighest(logs, primaryMetric)
    : [];

  /* ---------------- group by date ---------------- */

  const groupedByDate = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    logs.forEach((log) => {
      const date = log.workout_sessions?.workout_date;
      if (!date) return;

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(log);
    });

    Object.values(grouped).forEach((dayLogs) =>
      dayLogs.sort((a, b) => (a.sets ?? 0) - (b.sets ?? 0)),
    );

    return grouped;
  }, [logs]);

  /* ---------------- PR helpers ---------------- */

  const globalBest = useMemo(() => {
    if (!primaryMetric) return null;

    const values = logs.map((l) => l[primaryMetric]).filter((v) => v != null);

    return values.length ? Math.max(...values) : null;
  }, [logs, primaryMetric]);

  const getDayBest = (dayLogs: any[]) => {
    if (!primaryMetric) return null;

    const values = dayLogs
      .map((l) => l[primaryMetric])
      .filter((v) => v != null);

    return values.length ? Math.max(...values) : null;
  };

  const formatValue = (value: number) => {
    if (primaryMetric === "duration") {
      return `${value / 60} min`;
    }
    if (primaryMetric === "distance") {
      return `${value} km`;
    }
    if (primaryMetric === "weight") {
      return `${value} kg`;
    }
    return value;
  };

  /* ---------------- render ---------------- */

  return (
    <div className="p-4 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">{exercise.name}</h1>
        <p className="text-sm text-gray-400">Monthly best & workout history</p>
      </div>

      {/* CHART */}
      <div className="bg-surface rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-2">Monthly Highest</p>
        <MonthlyLineChart
          data={chartData}
          metricLabel="Weight"
          prValue={globalBest}
        />
      </div>

      {/* HISTORY */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-400">Workout History</h2>

        {loading && <p className="text-sm text-gray-500">Loading…</p>}

        {!loading &&
          Object.entries(groupedByDate)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([date, dayLogs]) => {
              const dayBest = getDayBest(dayLogs);
              const isPR = dayBest != null && dayBest === globalBest;

              return (
                <div key={date} className="bg-surface rounded-xl p-4 space-y-3">
                  {/* HEADER */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{date}</p>
                      <p className="text-xs text-gray-400">
                        {dayLogs.length} sets
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {isPR && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                          PR
                        </span>
                      )}

                      {dayBest != null && (
                        <span className="text-xs text-gray-300">
                          Best: {formatValue(dayBest)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* TABLE HEADER */}
                  <div className="grid grid-cols-5 gap-2 text-xs text-gray-400">
                    {dayLogs[0].sets && <span>Set</span>}
                    {dayLogs[0].reps && <span>Reps</span>}
                    {dayLogs[0].weight && <span>Kg</span>}
                    {dayLogs[0].duration && <span>Min</span>}
                    {dayLogs[0].distance && <span>Km</span>}
                  </div>

                  {/* SET ROWS */}
                  {dayLogs.map((log) => (
                    <div
                      key={log.id}
                      className="grid grid-cols-5 gap-2 text-sm"
                    >
                      {log.sets && <span>{log.sets}</span>}
                      {log.reps && <span>{log.reps}</span>}
                      {log.weight && <span>{log.weight}</span>}
                      {log.duration && (
                        <span>{Math.round(log.duration / 60)}</span>
                      )}
                      {log.distance && <span>{log.distance}</span>}
                    </div>
                  ))}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ExerciseDetailsPage;
