import Skeleton from "./Skeleton";

const LogbookSkeleton = () => (
  <div className="p-4 space-y-4">
    <Skeleton className="h-6 w-40" />

    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded-2xl" />
      ))}
    </div>
  </div>
);

export default LogbookSkeleton;
