import { supabase } from "../supabase/client";
import dayjs from "dayjs";

export const fetchSessionsForMonth = async (
  userId: string,
  month: dayjs.Dayjs
) => {
  const start = month.startOf("month").format("YYYY-MM-DD");
  const end = month.endOf("month").format("YYYY-MM-DD");

  const { data, error } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", userId)
    .gte("workout_date", start)
    .lte("workout_date", end);

  if (error) throw error;
  return data;
};

export const fetchWorkoutLogs = async (sessionId: string) => {
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
      exercises ( name )
    `
    )
    .eq("session_id", sessionId)
    .order("sets");

  if (error) throw error;
  return data;
};
