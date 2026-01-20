import Skeleton from "./Skeleton";

const HomeDetailsSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-48 mx-auto" />

    <Skeleton className="h-32 rounded-2xl" />

    <Skeleton className="h-12 w-full rounded-xl" />
    <Skeleton className="h-12 w-full rounded-xl" />
  </div>
);

export default HomeDetailsSkeleton;
