export interface WorkoutSession {
  id: string;
  workout_date: string; // YYYY-MM-DD
  completed: boolean;
}

export type DayStatus =
  | "past"
  | "future"
  | "today"
  | "workout"
  | "today_completed";
