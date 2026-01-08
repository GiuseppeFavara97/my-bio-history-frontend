import { Skeleton } from "@/components/ui/skeleton"
export function SkeletonDemo() {
  return (
    <div className="flex items-center p-3 space-x-4 w-full h-full">
      <Skeleton className="h-15 w-20 rounded-full" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/4" />
      </div>
    </div>
  )
}
