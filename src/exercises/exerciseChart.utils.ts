export const getPrimaryMetric = (metrics: Record<string, boolean>) => {
  if (metrics.weight) return "weight";
  if (metrics.reps) return "reps";
  if (metrics.duration) return "duration";
  if (metrics.distance) return "distance";
  return null;
};

const getMonthKey = (date: string) => date.slice(0, 7); // YYYY-MM

export const buildMonthlyHighest = (logs: any[], metric: string) => {
  const map: Record<string, number> = {};

  logs.forEach((log) => {
    const date = log.workout_sessions?.workout_date;
    const value = log[metric];

    if (!date || value == null) return;

    const month = getMonthKey(date);

    if (!map[month]) {
      map[month] = value;
    } else {
      map[month] = Math.max(map[month], value);
    }
  });

  return Object.entries(map)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => a.month.localeCompare(b.month));
};
