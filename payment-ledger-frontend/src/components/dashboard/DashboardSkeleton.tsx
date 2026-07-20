import { Skeleton } from "../ui/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>

      <Skeleton className="h-72 rounded-2xl" />

      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}