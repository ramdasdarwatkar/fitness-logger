import { supabase } from "../supabase/client";

export const fetchExercises = async () => {
  const { data, error } = await supabase.from("exercises").select("*");

  if (error) throw error;
  return data;
};

export interface ExercisePayload {
  name: string;
  category_id: string | null;
  metrics: Record<string, boolean>;
}

export const createExercise = async (payload: ExercisePayload) => {
  const { data, error } = await supabase
    .from("exercises")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateExercise = async (id: string, payload: ExercisePayload) => {
  const { data, error } = await supabase
    .from("exercises")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
