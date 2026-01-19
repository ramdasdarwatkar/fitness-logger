import { supabase } from "../supabase/client";
import { getCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";

const buildNotesFromCategoryIds = (categoryIds: string[]) => {
  const categories = (getCache(LS_KEYS.CATEGORIES) as any[]) || [];

  return categories
    .filter((c: any) => categoryIds.includes(c.id))
    .map((c: any) => c.name)
    .join(" - ");
};

export const createOrGetSessionForDate = async (
  userId: string,
  workoutDate: string,
  selectedCategoryIds: string[] = [],
) => {
  const newNotes = buildNotesFromCategoryIds(selectedCategoryIds);

  const { data: existing } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("workout_date", workoutDate)
    .single();

  if (existing) {
    const existingNotes = existing.notes || "";

    const mergedNotes = Array.from(
      new Set(
        [...existingNotes.split(" - "), ...newNotes.split(" - ")]
          .map((n) => n.trim())
          .filter(Boolean),
      ),
    ).join(" - ");

    const { data: updated, error } = await supabase
      .from("workout_sessions")
      .update({ notes: mergedNotes })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  }

  const { data, error } = await supabase
    .from("workout_sessions")
    .insert({
      user_id: userId,
      workout_date: workoutDate,
      notes: newNotes,
      completed: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getSessionById = async (sessionId: string) => {
  const { data, error } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error) throw error;
  return data;
};

/* ✅ ADDITIONAL SAFE HELPER (USED BY UI) */
export const finishSession = async (sessionId: string) => {
  const { error } = await supabase
    .from("workout_sessions")
    .update({ completed: true })
    .eq("id", sessionId);

  if (error) throw error;
};
