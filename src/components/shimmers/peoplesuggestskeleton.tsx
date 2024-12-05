import { Skeleton } from "@/components/ui/skeleton";

export default function PeopleSuggestionsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2 mb-4" />
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-secondary p-3 lg:p-4 rounded-lg"
          >
            <Skeleton className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" />
            <div className="flex-grow space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}