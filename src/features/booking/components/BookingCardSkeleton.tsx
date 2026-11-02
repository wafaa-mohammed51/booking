import { Skeleton } from "@/components/ui/skeleton";

export default function BookingCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-secondary bg-card p-4 flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Doctor info */}
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Location */}
      <Skeleton className="h-4 w-48" />

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-1">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </div>
    </div>
  );
}
