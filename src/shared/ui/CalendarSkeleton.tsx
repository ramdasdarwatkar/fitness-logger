import Skeleton from "./Skeleton";

const CalendarSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-40 mx-auto" />

    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 35 }).map((_, i) => (
        <Skeleton key={i} className="h-10 rounded-full" />
      ))}
    </div>
  </div>
);

export default CalendarSkeleton;
