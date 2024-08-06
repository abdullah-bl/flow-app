import { Skeleton } from "../ui/skeleton"

export default function TableSkeleton() {
  return (
    <div className="grid gap-1">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}
