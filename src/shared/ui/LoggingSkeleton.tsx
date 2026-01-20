import Skeleton from "./Skeleton";

const LoggingSkeleton = () => (
  <div className="p-4 space-y-4">
    <Skeleton className="h-12 w-full rounded-xl" />

    <Skeleton className="h-6 w-32" />

    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>

    <Skeleton className="h-12 w-full rounded-xl" />
  </div>
);

export default LoggingSkeleton;
