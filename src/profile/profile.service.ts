import dayjs from "dayjs";
import { supabase } from "../supabase/client";
import type { ProfileEntry } from "./profile.types";

/**
 * Fetch latest profile entry (not date-specific)
 */
export const getLatestProfile = async (): Promise<ProfileEntry | null> => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .order("input_date", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    // no rows case
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return data;
};

/**
 * Save profile
 * - If no record exists → insert
 * - Else → update latest record
 */
export const saveProfile = async (values: Partial<ProfileEntry>) => {
  const { data: existing, error } = await supabase
    .from("profile")
    .select("id")
    .order("input_date", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  // No record → INSERT
  if (!existing) {
    const { error: insertError } = await supabase.from("profile").insert({
      ...values,
      input_date: dayjs().format("YYYY-MM-DD"),
    });

    if (insertError) throw insertError;
    return;
  }

  // Record exists → UPDATE latest
  const { error: updateError } = await supabase
    .from("profile")
    .update({
      ...values,
      input_date: dayjs().format("YYYY-MM-DD"),
    })
    .eq("id", existing.id);

  if (updateError) throw updateError;
};
