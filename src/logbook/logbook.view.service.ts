import { supabase } from "../supabase/client";

export const fetchLogbook = async (sessionId: string) => {
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
      exercises (
        id,
        name
      )
    `
    )
    .eq("session_id", sessionId)
    .order("sets", { ascending: true });

  if (error) throw error;
  return data || [];
};
