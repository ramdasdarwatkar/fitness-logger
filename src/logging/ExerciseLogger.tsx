import { useState } from "react";
import { supabase } from "../supabase/client";
import PageTransition from "../shared/ui/PageTransition";

interface Props {
  sessionId: string;
  exercise: any;
  previousLogs: any[];
  onSaved: () => void;
  readOnly?: boolean;
}

/* Compact Hevy-style controls */
const CONTROL =
  "h-10 w-14 bg-bg rounded-md text-center border border-gray-700 text-sm";
const CONTROL_WIDE =
  "h-10 w-16 bg-bg rounded-md text-center border border-gray-700 text-sm";

const BTN =
  "h-10 w-9 rounded-md bg-gray-700 flex items-center justify-center text-base font-medium";

const BTN_DANGER =
  "h-10 w-9 rounded-md bg-red-600/20 text-red-400 flex items-center justify-center text-base font-medium";

export const ExerciseLogger = ({
  sessionId,
  exercise,
  previousLogs,
  onSaved,
  readOnly = false,
}: Props) => {
  const metrics = exercise.metrics || {};
  const hasSets = !!metrics.sets;
  const isReadOnly = readOnly === true;

  const createRow = (base?: any) => ({
    reps: base?.reps ?? "",
    weight: base?.weight ?? "",
    durationMin: base?.durationMin ?? "",
    durationSec: base?.durationSec ?? "",
    distanceKm: base?.distanceKm ?? "",
    distanceM: base?.distanceM ?? "",
  });

  const [rows, setRows] = useState<any[]>(() => {
    if (previousLogs.length) {
      return previousLogs.map((r) => ({
        id: r.id,
        reps: r.reps ?? "",
        weight: r.weight ?? "",
        durationMin: r.duration ? Math.floor(r.duration / 60) : "",
        durationSec: r.duration ? r.duration % 60 : "",
        distanceKm: r.distance ? Math.floor(r.distance) : "",
        distanceM: r.distance ? Math.round((r.distance % 1) * 1000) : "",
      }));
    }
    return [createRow()];
  });

  /* ---------- helpers ---------- */

  const updateRow = (index: number, field: string, value: string | number) => {
    if (isReadOnly) return;
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)),
    );
  };

  const adjust = (index: number, field: string, delta: number) => {
    if (isReadOnly) return;
    const current = Number(rows[index][field] || 0);
    updateRow(index, field, Math.max(0, current + delta));
  };

  const removeRow = async (index: number) => {
    if (isReadOnly || rows.length === 1) return;

    const row = rows[index];
    if (row.id) {
      await supabase.from("workout_logs").delete().eq("id", row.id);
    }

    const updated = rows.filter((_, i) => i !== index);

    await Promise.all(
      updated
        .filter((r) => r.id)
        .map((r, i) =>
          supabase
            .from("workout_logs")
            .update({ sets: i + 1 })
            .eq("id", r.id),
        ),
    );

    setRows(updated);
  };

  const canAddNext = (row: any) => {
    if (metrics.reps && !row.reps) return false;
    if (metrics.weight && !row.weight) return false;
    if (metrics.duration && !row.durationMin && !row.durationSec) return false;
    if (metrics.distance && !row.distanceKm && !row.distanceM) return false;
    return true;
  };

  const addNextRow = () => {
    if (isReadOnly) return;
    setRows((prev) => [...prev, createRow(prev[prev.length - 1])]);
  };

  /* ---------- save ---------- */

  const save = async () => {
    if (isReadOnly) return;

    const inserts: any[] = [];
    const updates: any[] = [];

    rows.forEach((r, index) => {
      const hasData =
        (metrics.reps && r.reps && r.weight) ||
        (metrics.duration && (r.durationMin || r.durationSec)) ||
        (metrics.distance && (r.distanceKm || r.distanceM));

      if (!hasData) return;

      const payload = {
        session_id: sessionId,
        exercise_id: exercise.id,
        sets: hasSets ? index + 1 : null,
        reps: metrics.reps ? Number(r.reps) || null : null,
        weight: metrics.weight ? Number(r.weight) || null : null,
        duration:
          metrics.duration && (r.durationMin || r.durationSec)
            ? Number(r.durationMin || 0) * 60 + Number(r.durationSec || 0)
            : null,
        distance:
          metrics.distance && (r.distanceKm || r.distanceM)
            ? Number(r.distanceKm || 0) + Number(r.distanceM || 0) / 1000
            : null,
      };

      r.id ? updates.push({ id: r.id, ...payload }) : inserts.push(payload);
    });

    if (updates.length) {
      await Promise.all(
        updates.map((u) =>
          supabase.from("workout_logs").update(u).eq("id", u.id),
        ),
      );
    }

    if (inserts.length) {
      await supabase.from("workout_logs").insert(inserts);
    }

    onSaved();
  };

  /* ---------- UI ---------- */

  return (
    <PageTransition>
      <div className="bg-surface p-4 rounded-xl space-y-3">
        <h3 className="font-medium">{exercise.name}</h3>

        {rows.map((row, idx) => (
          <div key={idx} className="flex items-center gap-2 w-full">
            {hasSets && (
              <div className="w-6 text-center text-sm text-gray-400">
                {idx + 1}
              </div>
            )}

            {metrics.weight && (
              <div className="flex items-center gap-1">
                <button
                  className={BTN}
                  onClick={() => adjust(idx, "weight", -2.5)}
                >
                  −
                </button>
                <input
                  className={CONTROL_WIDE}
                  placeholder="kg"
                  value={row.weight}
                  onChange={(e) => updateRow(idx, "weight", e.target.value)}
                />
                <button
                  className={BTN}
                  onClick={() => adjust(idx, "weight", 5)}
                >
                  +
                </button>
              </div>
            )}

            {metrics.reps && (
              <div className="flex items-center gap-1">
                <button className={BTN} onClick={() => adjust(idx, "reps", -1)}>
                  −
                </button>
                <input
                  className={CONTROL}
                  placeholder="reps"
                  value={row.reps}
                  onChange={(e) => updateRow(idx, "reps", e.target.value)}
                />
                <button className={BTN} onClick={() => adjust(idx, "reps", 5)}>
                  +
                </button>
              </div>
            )}

            {metrics.duration && (
              <div className="flex items-center gap-1">
                <input
                  className={CONTROL}
                  placeholder="min"
                  value={row.durationMin}
                  onChange={(e) =>
                    updateRow(idx, "durationMin", e.target.value)
                  }
                />
                <input
                  className={CONTROL}
                  placeholder="sec"
                  value={row.durationSec}
                  onChange={(e) =>
                    updateRow(idx, "durationSec", e.target.value)
                  }
                />
              </div>
            )}

            {metrics.distance && (
              <div className="flex items-center gap-1">
                <input
                  className={CONTROL}
                  placeholder="km"
                  value={row.distanceKm}
                  onChange={(e) => updateRow(idx, "distanceKm", e.target.value)}
                />
                <input
                  className={CONTROL}
                  placeholder="m"
                  value={row.distanceM}
                  onChange={(e) => updateRow(idx, "distanceM", e.target.value)}
                />
              </div>
            )}

            {hasSets && !isReadOnly && (
              <button className={BTN_DANGER} onClick={() => removeRow(idx)}>
                −
              </button>
            )}
          </div>
        ))}

        {hasSets && !isReadOnly && (
          <button
            disabled={!canAddNext(rows[rows.length - 1])}
            onClick={addNextRow}
            className="w-full h-11 rounded-lg bg-gray-700 disabled:opacity-40"
          >
            + Add Set
          </button>
        )}

        {!isReadOnly && (
          <button
            onClick={save}
            className="w-full h-11 rounded-lg bg-primary text-black font-semibold"
          >
            Save
          </button>
        )}
      </div>
    </PageTransition>
  );
};
