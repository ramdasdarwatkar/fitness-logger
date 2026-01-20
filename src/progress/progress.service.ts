import { supabase } from "../supabase/client";
import type { BodyMetricKey, ProgressPoint } from "./progress.types";

/**
 * Fetch history for a single body metric
 * - Weight stays in kg
 * - Lengths stay in cm (conversion happens in UI)
 */
export const getMetricHistory = async (
  metric: BodyMetricKey,
): Promise<ProgressPoint[]> => {
  const { data, error } = await supabase
    .from("profile")
    .select(`input_date, ${metric}`)
    .order("input_date", { ascending: true });

  if (error) throw error;

  if (!data) return [];

  return data
    .filter((row: any) => row[metric] !== null)
    .map((row: any) => ({
      date: row.input_date,
      value: row[metric] as number,
    }));
};
