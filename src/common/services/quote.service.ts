import dayjs from "dayjs";
import { supabase } from "../../supabase/client";
import { LS_KEYS } from "../../storage/localStorage.keys";

interface CachedQuote {
  quote: string;
  author?: string;
}

export const getSequentialQuote = async (): Promise<CachedQuote | null> => {
  const expiresAt = localStorage.getItem(LS_KEYS.QUOTE_EXPIRES_AT);
  const now = Date.now();

  // ✅ Still valid today
  if (expiresAt && now < Number(expiresAt)) {
    const cached = localStorage.getItem(LS_KEYS.DAILY_QUOTE);
    if (cached) return JSON.parse(cached);
  }

  // 🔢 Get current index
  const index = Number(localStorage.getItem(LS_KEYS.QUOTE_INDEX) || 0);

  // Fetch next quote
  const { data, error } = await supabase
    .from("daily_quotes")
    .select("quote")
    .order("id")
    .range(index, index)
    .single();

  if (error || !data) return null;

  // ⏰ Expire at next midnight
  const nextMidnight = dayjs().add(1, "day").startOf("day").valueOf();

  // Cache
  localStorage.setItem(LS_KEYS.DAILY_QUOTE, JSON.stringify(data));
  localStorage.setItem(LS_KEYS.QUOTE_EXPIRES_AT, String(nextMidnight));
  localStorage.setItem(LS_KEYS.QUOTE_INDEX, String(index + 1));

  return data;
};
