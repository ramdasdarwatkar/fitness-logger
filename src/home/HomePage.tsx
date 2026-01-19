import { useState } from "react";
import dayjs from "dayjs";
import { CalendarView } from "../calendar/CalendarView";
import { HomeDetails } from "./HomeDetails";

export const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <section className="md:w-1/2 border-b md:border-b-0 md:border-r border-gray-800">
        <CalendarView selectedDate={selectedDate} onSelect={setSelectedDate} />
      </section>

      <section className="md:w-1/2 flex-1 overflow-y-auto">
        <HomeDetails selectedDate={selectedDate} />
      </section>
    </div>
  );
};
