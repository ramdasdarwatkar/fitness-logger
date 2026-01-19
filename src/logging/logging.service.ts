import { supabase } from "../supabase/client";

interface LogRow {
  session_id: string;
  exercise_id: string;
  sets: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

export const saveWorkoutLogs = async (rows: LogRow[]) => {
  const { error } = await supabase.from("workout_logs").insert(rows);

  if (error) throw error;
};
