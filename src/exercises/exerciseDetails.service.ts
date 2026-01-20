import { supabase } from "../supabase/client";

export const getExerciseLogs = async (exerciseId: string) => {
  const { data, error } = await supabase
    .from("workout_logs")
    .select(
      `
      id,
      sets,
      reps,
      weight,
      duration,
      distance,
      workout_sessions (
        workout_date
      )
    `,
    )
    .eq("exercise_id", exerciseId)
    .order("sets", { ascending: true });

  if (error) throw error;
  return data;
};
