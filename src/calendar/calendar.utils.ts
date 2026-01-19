import dayjs from "dayjs";
import type { WorkoutSession } from "./calendar.types";

export const getMonthDaysFor = (month: dayjs.Dayjs) => {
  const start = month.startOf("month");
  const end = month.endOf("month");

  const days: string[] = [];
  let d = start;

  while (d.isBefore(end) || d.isSame(end)) {
    days.push(d.format("YYYY-MM-DD"));
    d = d.add(1, "day");
  }

  return days;
};

export const getMonthDays = () => {
  const start = dayjs().startOf("month");
  const end = dayjs().endOf("month");

  const days: string[] = [];
  let d = start;

  while (d.isBefore(end) || d.isSame(end)) {
    days.push(d.format("YYYY-MM-DD"));
    d = d.add(1, "day");
  }

  return days;
};

export const getDayStatus = (date: string, sessions: WorkoutSession[]) => {
  const today = dayjs().format("YYYY-MM-DD");
  const session = sessions.find((s) => s.workout_date === date);

  // Today has highest priority
  if (date === today) {
    if (session?.completed) return "today_completed";
    return "today";
  }

  // Past workout days
  if (session) {
    return "workout";
  }

  // Past no-workout
  if (dayjs(date).isBefore(today)) {
    return "past";
  }

  // Future
  return "future";
};
