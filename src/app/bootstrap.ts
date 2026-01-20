import { fetchCategories } from "../common/services/category.service";
import { fetchExercises } from "../exercises/exercise.service";
import { getSequentialQuote } from "../common/services/quote.service";
import { setCache } from "../storage/cache";
import { LS_KEYS } from "../storage/localStorage.keys";

/**
 * App bootstrap
 * - Fetch static data
 * - Cache it explicitly
 * - Fetch daily sequential quote (self-cached)
 */
export const bootstrapApp = async () => {
  const [categories, exercises] = await Promise.all([
    fetchCategories(),
    fetchExercises(),
  ]);

  // ✅ Explicit caching (this was missing)
  setCache(LS_KEYS.CATEGORIES, categories);
  setCache(LS_KEYS.EXERCISES, exercises);

  // 🔥 Quote manages its own cache
  await getSequentialQuote();
};
