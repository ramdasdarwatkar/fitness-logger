import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getMonthDaysFor, getDayStatus } from "./calendar.utils";
import { useWorkoutStore } from "../workout/workout.store";
import { fetchSessionsForMonth } from "../workout/workout.service";
import { useAuthStore } from "../auth/auth.store";

interface Props {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export const CalendarView = ({ selectedDate, onSelect }: Props) => {
  const [month, setMonth] = useState(dayjs());

  const sessions = useWorkoutStore((s) => s.sessions);
  const setSessions = useWorkoutStore((s) => s.setSessions);
  const userId = useAuthStore((s) => s.userId);

  const days = getMonthDaysFor(month);

  // 🔥 FETCH SESSIONS WHEN MONTH CHANGES
  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      const data = await fetchSessionsForMonth(userId, month);
      setSessions(data);
    };

    load();
  }, [month, userId, setSessions]);

  return (
    <div className="h-full px-4 py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonth(month.subtract(1, "month"))}
          className="text-gray-400 text-lg"
        >
          ‹
        </button>

        <h2 className="font-semibold">{month.format("MMMM YYYY")}</h2>

        <button
          onClick={() => setMonth(month.add(1, "month"))}
          className="text-gray-400 text-lg"
        >
          ›
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-2 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {days.map((date) => {
          const status = getDayStatus(date, sessions);
          const isFuture = dayjs(date).isAfter(dayjs(), "day");
          const isSelected = selectedDate === date;

          return (
            <button
              key={date}
              disabled={isFuture}
              onClick={() => onSelect(date)}
              className={`
  h-10 w-10 mx-auto rounded-md
  flex items-center justify-center
  text-sm transition
  ${
    status === "workout" || status === "today_completed"
      ? "bg-primary text-black hover:bg-white hover:text-black"
      : "hover:bg-surface"
  }
  ${status === "today" ? "border border-gray-400" : ""}
  ${isSelected ? "ring-2 ring-primary" : ""}
  ${isFuture ? "opacity-30" : ""}
`}
            >
              {dayjs(date).date()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
