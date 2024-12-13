import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPostsSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {[...Array(3)].map((_, index) => (
        <Card 
          key={index} 
          className="overflow-hidden  duration-300 transition-all"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 order-2 sm:order-1">
                {/* Title */}
                <Skeleton className="h-8 sm:h-10 w-3/4 mb-2" />
                
                {/* Description */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 sm:h-5 w-full" />
                  <Skeleton className="h-4 sm:h-5 w-5/6" />
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 sm:h-5 w-1/3" />
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap justify-between text-xs sm:text-sm">
                  <Skeleton className="h-3 sm:h-4 w-1/4 mr-2" />
                  <Skeleton className="h-3 sm:h-4 w-1/4 mr-2" />
                  <Skeleton className="h-3 sm:h-4 w-1/4" />
                </div>
              </div>

              {/* Image */}
              <div className="sm:col-span-1 order-1 sm:order-2 mb-4 sm:mb-0">
                <Skeleton className="w-full h-40 sm:h-48 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}