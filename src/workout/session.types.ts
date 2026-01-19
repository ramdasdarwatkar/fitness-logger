export interface WorkoutSession {
  id: string;
  user_id: string;
  workout_date: string;
  notes: string | null;
  completed: boolean;
}
